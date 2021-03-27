const mongoose = require('mongoose')
const Restaurant = require('../restaurant') // 載入 todo model

mongoose.connect('mongodb://localhost/restaurant-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')

  // 引入餐廳清單 json
  const restList = require('../../restaurant.json')

  // 寫入多筆資料
  Restaurant.insertMany(restList.results, function (err, restaurants) {
    if (err) {
      return console.error(err)
    }
  })

  console.log('done')
})
