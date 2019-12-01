require("dotenv").config();
require("newrelic");
var express = require("express");
var cors = require("cors");
var path = require("path");
var PORT = process.env.PORT || 5000;
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var moment = require("moment");
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
const Commute = require("./models/commute");
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
          var currentCity = data[2].long_name;
          var currentState = data[4].short_name;
          //res.send(data)
          var currentLocation = { type: "Point", coordinates: [lng, lat] };

          Location.findOneAndUpdate(
            { name: "Current" },
            {
              location: currentLocation,
              city: currentCity,
              state: currentState
            },
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
app.post("/api/commute", async (req, res) => {
  var newName = req.body.name;
  var newAddress = req.body.address;
  console.log(newAddress);

  //Convert input commute address to geolocation
  await googleMapsClient
    .geocode({ address: newAddress })
    .asPromise()
    .then(response => {
      var data = response.json.results[0].geometry.location;
      var fullAddress = response.json.results[0].formatted_address;
      console.log(fullAddress);
      var commuteLng = data.lng;
      var commuteLat = data.lat;
      var commuteLocation = [commuteLat, commuteLng];
      //Get current Location
      Location.findOne({ name: "Current" }, (err, data) => {
        if (err) console.log(`Test error: ${err}`);
        else {
          var currentLocation = [
            data.location.coordinates[1],
            data.location.coordinates[0]
          ];
          var currentTime = moment().unix();

          //Get directions between new input commute and current location
          googleMapsClient
            .directions({
              origin: currentLocation,
              destination: commuteLocation,
              departure_time: currentTime,
              alternatives: true
            })
            .asPromise()
            .then(async response => {
              var routes = response.json.routes; //routes is an array (options of routes to take)
              console.log(routes);

              var destination = {
                type: "Point",
                coordinates: [commuteLat, commuteLng]
              };

              //Create new mongodb collection for each new commute address, with subdoc that is the array of routes
              const poi = new Commute({
                name: newName,
                address: fullAddress,
                location: destination
              });
              poi.directions = [];
              routes.forEach(route =>
                poi.directions.push({
                  summary: route.summary,
                  driveTime: route.legs[0].duration.text
                })
              );
              await poi.save((err, doc) => {
                if (err) console.log(`poi save error: ${err}`);
                //else console.log(doc);
                else res.json(doc);
              });
            })
            .catch(err => {
              console.log(
                `Save new routes to mongoDB error: ${JSON.stringify(err)}`
              );
            });
        }
      });
    })
    .catch(err => {
      console.log(`Api Commute post err: ${err}`);
    });
});

// API to get commute info
app.get("/api/commute", (req, res) => {
  Commute.find({})
    .sort({ timeStamp: 1 })
    .exec((error, doc) => {
      if (error) console.log(`Mongoose get commute error: ${error}`);
      else res.json(doc);
    });
});

// API to delete commute from list
app.delete("/api/commute/:id", (req, res) => {
  Commute.findByIdAndRemove({ _id: req.params.id }).exec((err, doc) => {
    if (err) return console.log(`MongoDB delete commute ERROR: ${err}`);
    else {
      console.log(`Deleted address: ${doc}`);
    }
  });
});

//API to get weather forecast
app.get("/api/forecast", (req, res) => {
  Location.findOne({ name: "Current" }, (err, data) => {
    if (err) console.log(`Mongoose forecast location error: ${err}`);
    else {
      var location = data.location.coordinates;
      var lng = data.location.coordinates[0];
      var lat = data.location.coordinates[1];
      var city = data.city;
      var state = data.state;
      console.log(location);

      var darkskyUrl = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${lat},${lng}`;
      console.log(darkskyUrl);
      axios
        .get(darkskyUrl)
        .then(async forecast => {
          var daily = forecast.data.daily.data.slice(1);
          var currently = forecast.data.currently;
          var currentIcon = currently.icon.replace(/-/g, "_").toUpperCase();
          console.log(currentIcon);
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
