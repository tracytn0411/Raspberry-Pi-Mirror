require("dotenv").config();
require("newrelic");
var express = require("express");
var cors = require("cors");
var path = require("path");
var PORT = process.env.PORT || 5000;
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var moment = require('moment');
const axios = require("axios");

// Initialize Express
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "client/build"))); //frontend code

//Connect to MongoDB
const mongoose = require("mongoose");
const Location = require("./models/geo");
//const dbURI = "mongodb://localhost:27017/raspi_mirror";
const dbURI = process.env.MONGODB_MIRROR_URI;

mongoose.connect(dbURI, {
  //to get rid of terminal deprecationwarning
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
var db = mongoose.connection;
db.on("error", function(error) {
  console.log("Database Error:", error);
});
db.once("open", function() {
  console.log("Mongoose connection successfully.");
});

// Direct to homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Display weather page
app.post("/weather", (req, res) => {
  // console.log(typeof req.body.lat)
  axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${req.body.lat}&lon=${req.body.lon}&appid=${process.env.API_KEY}&units=Imperial`
    )
    .then(function(response) {
      // handle success
      // console.log(response.data);
      res.send(response.data);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
});

app.get("/api/news", (req, res) => {
  var newsURL = `https://newsapi.org/v2/top-headlines?country=us&pageSize=7&apiKey=${process.env.GOOGLENEWS_API_KEY}`;

  axios
    .get(newsURL)
    .then(response => {
      //console.log(response.data)
      res.json(response.data);
    })
    .catch(err => console.log(err));
});

//========================= Google Maps ========================//

// Create client object for Google API
const googleMapsClient = require("@google/maps").createClient({
  key: process.env.GEOLOCATION_API_KEY,
  Promise: Promise
});

// Api to get current geolocation, then add to MongoDB
app.get("/api/geo", (req, res) => {
  googleMapsClient
    .geolocate({})
    .asPromise()
    .then(res => {
      var geo = res.json.location;
      //console.log(geo);
      var lng = geo.lng;
      var lat = geo.lat;
      console.log(lng, lat);
      googleMapsClient
        .reverseGeocode({ latlng: [lat, lng] })
        .asPromise()
        .then(res => {
          var data = res.json.results[0].address_components;
          console.log(JSON.stringify(data));
          var currentCity = data[2].long_name
          var currentState = data[4].short_name
          //res.send(data)
          var currentLocation = { type: "Point", coordinates: [lng, lat] };

          Location.findOneAndUpdate(
            { name: "Current" },
            { location: currentLocation, city: currentCity, state: currentState },
            function(err, doc) {
              if (err) console.log(`Mongoose geo err: ${err}`);
              else {
                console.log(`Updated!`);
              }
            }
          );
        })
        .catch(err => {
          console.log(`Api ReverseGeo err: ${err}`);
        });
    })
    .catch(err => {
      console.log(`Api Geo current location err: ${err}`);
    });
});

// Api to take user's commute address, use geocoding to convert and save to MongoDB
app.post("/api/commute", (req, res) => {
  var homeAddress = req.body.home;
  console.log(homeAddress);
  googleMapsClient
    .geocode({ address: homeAddress })
    .asPromise()
    .then(response => {
      var data = response.json.results[0].geometry.location;
      var destination = { type: "Point", coordinates: [data.lng, data.lat] };

      Location.create({ name: "Home", location: destination });
      console.log(response.json.results);
      res.json(data);
    })
    .catch(err => {
      console.log(`Api Commute from home err: ${err}`);
    });

  var workAddress = req.body.work;
  googleMapsClient
    .geocode({ address: workAddress })
    .asPromise()
    .then(response => {
      var data = response.json.results[0].geometry.location;
      var destination = { type: "Point", coordinates: [data.lng, data.lat] };

      Location.create({ name: "Work", location: destination });
      console.log(response.json.results);
      res.json(data);
    })
    .catch(err => {
      console.log(`Api Commute to work err: ${err}`);
    });
});

// API to get commute info
app.get('/api/commute', (req, res) => {

  var homeLocation = [38.3112914,-122.4890685]
  var workLocation = [37.7913654,-122.3937412]

  var currentTime = moment().unix()
  console.log(currentTime)
  googleMapsClient
    .directions({origin: homeLocation, destination: workLocation, departure_time: currentTime, alternatives: true})
    .asPromise()
    .then(response => {
      //var data = JSON.stringify(response.json.routes)
      var data = response.json.routes
      //var routes = data[1]
      console.log(data)
      res.json(data)
    })
    .catch(err => {
      console.log(`Api get commute err: ${err}`)
    })
})

//API to get weather forecast
app.get("/api/forecast", (req, res) => {
  Location.findOne({ name: "Current" }, (err, data) => {
    if (err) console.log(`Mongoose forecast location error: ${err}`);
    else {
      var location = data.location.coordinates;
      var lng = data.location.coordinates[0];
      var lat = data.location.coordinates[1];
      var city = data.city
      var state = data.state
      console.log(location);

      var darkskyUrl = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${lat},${lng}`;
      console.log(darkskyUrl);
      axios
        .get(darkskyUrl)
        .then(forecast => {
          var daily = forecast.data.daily.data.slice(1)
          var currently = forecast.data.currently;
          var currentIcon = currently.icon.replace(/-/g, "_").toUpperCase()
          console.log(currentIcon)
          res.json({
            daily: daily,
            current: currently,
            currentIcon: currentIcon,
            currentCity: city,
            currentState: state
          });
        })
        .catch(error => {
          console.log(`Dark Sky error: ${error}`);
        });
    }
  });
});

app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));
