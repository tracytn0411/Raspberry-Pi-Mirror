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

//This tell express server where the frontend code is
app.use(express.static(path.join(__dirname, 'client/build')));

// Direct to homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})


app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));
