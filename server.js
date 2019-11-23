require ('dotenv').config();
require ('newrelic');
var express = require('express');
var cors = require('cors');
var path = require('path');
var PORT = process.env.PORT || 5000
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var axios = require('axios')

// Initialize Express
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors())
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'client/build'))); //frontend code

//Connect to MongoDB
const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost:27017/raspi_mirror'
mongoose.connect(dbURI, {
  //to get rid of terminal deprecationwarning
  useCreateIndex: true,
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});
var db = mongoose.connection;
db.on("error", function(error) {
  console.log("Database Error:", error);
});
db.once("open", function () {
  console.log("Mongoose connection successfully.");
});

// Direct to homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})

var lat = '';
var lng = '';

//API to get weather forecast
app.get('/api/forecast', (req, res) => {
  var geoUrl = `https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.GEOLOCATION_API_KEY}`
  console.log(geoUrl)
  axios
    .post(geoUrl, {})
    .then(response => {
      console.log(response.data)
      lat = response.data.location.lat
      lng = response.data.location.lng
      console.log(lat, lng)
      //res.json(response.data)
      //var time = '[YYYY]-[MM]-[DD]T[HH]:[MM]:[SS]'
      var darkskyUrl = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${lat},${lng}`
      console.log(darkskyUrl)
      axios
        .get(darkskyUrl)
        .then(forecast => {
          var daily = forecast.data.daily.data
          console.log(daily)
          res.json(daily)
        })
        .catch(error => {
          console.log(`Dark Sky error: ${error}`)
        })
    })
    .catch(error => {
      console.log(`Geo API error: ${error}`)
    })
  
})


app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));
