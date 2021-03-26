const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true, // 這是個必填欄位
  },
  category: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  google_map: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
module.exports = mongoose.model('Restaurant', restaurantSchema)
