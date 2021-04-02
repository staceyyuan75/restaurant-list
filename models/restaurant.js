const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  name_en: String,
  category: { type: String, required: true },
  image: String,
  location: { type: String, required: true },
  phone: String,
  google_map: String,
  rating: Number,
  description: String,
})
restaurantSchema.index({ name: 'text', name_en: 'text', category: 'text' })
module.exports = mongoose.model('Restaurant', restaurantSchema)
