const mongoose = require('mongoose')
const Schema = mongoose.Schema

// const pointSchema = new Schema({
//   type: {
//     type: String,
//     enum: ['Point'],
//     required: true
//   },
//   coordinates: {
//     type: [Number],
//     required: true,
//     default: [-122.4806783, 38.313197699999996]
//   }
// })

// const locationSchema = new Schema({
//   name: {
//     type: String,
//     default: 'Current'
//   },
//   city: {
//     type: String,
//     default: 'San Francisco'
//   },
//   state:{
//     type: String,
//     default: 'CA'
//   },
//   location: {
//     type: pointSchema,
//     required: true
//   }
// });

const locationSchema = new Schema({
  name: {
    type: String,
    default: 'Current'
  },
  city: {
    type: String,
    default: 'San Francisco'
  },
  state:{
    type: String,
    default: 'CA'
  },
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});
 
module.exports = mongoose.model('Location', locationSchema);