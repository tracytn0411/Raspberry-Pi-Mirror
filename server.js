require ('dotenv').config();
require ('newrelic');
var express = require('express');
var cors = require('cors');
var path = require('path');
var PORT = process.env.PORT || 5000
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

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


app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));
