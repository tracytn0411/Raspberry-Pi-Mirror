const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mediaSchema = new Schema({
  title: String,
  link: String
});
  
module.exports = mongoose.model('Media', mediaSchema);