const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commuteSchema = new Schema({
  
  name: String,
  currentGeo: {
    type: Schema.Types.ObjectId,
    ref: 'Location'
  },
  address: String,
  directions: [{
    summary: String,
    driveTime: String
  }],
  timeStamp: {
    type: Date,
    default: Date.now()
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

module.exports = mongoose.model('Commute', commuteSchema);