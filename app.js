// app.js
// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurant')

// setting connect to MongoDB
mongoose.connect('mongodb://localhost/restaurant-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
// db connection
const db = mongoose.connection
// db connect error
db.on('error', () => {
  console.log('mongodb error!')
})
// db connect success
db.once('open', () => {
  console.log('mongodb connected!')
})

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// routes setting
app.get('/', (req, res) => {
  // past the restaurant data into 'index' partial template
  Restaurant.find() // 取出 Restaurant model 裡的所有資料
    .lean()
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.log(error))
})

// 編輯內容頁
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id

  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((error) => console.log(error))
})

// 修改一筆餐廳資料
app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id

  return Restaurant.findById(id)
    .then((restaurant) => {
      restaurant.name = req.body.name
      restaurant.name_en = req.body.name_en
      restaurant.category = req.body.category
      restaurant.phone = req.body.phone
      restaurant.location = req.body.location
      restaurant.google_map = req.body.google_map
      restaurant.description = req.body.description
      restaurant.image = req.body.image

      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.log(error))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter((restaurant) => {
    const resultName = restaurant.name
      .toLowerCase()
      .includes(keyword.toLowerCase())
    if (resultName == false) {
      return restaurant.category.toLowerCase().includes(keyword.toLowerCase())
    }

    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
