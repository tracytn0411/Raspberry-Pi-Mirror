const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pointSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true,
    default: [-122.4806783, 38.313197699999996]
  }
})

const locationSchema = new mongoose.Schema({
  name: String,
  location: {
    type: pointSchema,
    required: true
  }
});

var Location = mongoose.model('Location', locationSchema);
module.exports = Location