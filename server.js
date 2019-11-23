require('dotenv').config();
require('newrelic');
var express = require('express');
var cors = require('cors');
var path = require('path');
var PORT = process.env.PORT || 5000
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
const axios = require('axios');

// Initialize Express
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
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
db.on("error", function (error) {
  console.log("Database Error:", error);
});
db.once("open", function () {
  console.log("Mongoose connection successfully.");
});

// Direct to homepage
app.post('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})

// Display weather page
app.post('/weather', (req, res) => {
  // console.log(typeof req.body.lat)
  axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${req.body.lat}&lon=${req.body.lon}&appid=${process.env.API_KEY}&units=Imperial`)
    .then(function (response) {
      // handle success
      // console.log(response.data);
      res.send(response.data)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
})




app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));
