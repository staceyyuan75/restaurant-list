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
    .then((restaurants) =>
      res.render('index', {
        restaurants: restaurants,
        banner: true,
        addRestaurant: true,
      })
    )
    .catch((error) => console.log(error))
})

// 餐廳新增頁
app.get('/restaurants/new', (req, res) => {
  /*
  Restaurant.find({ $max: 'id' })
    .then((restaurant) => res.render('new', { restaurant }))
    .catch((error) => console.log(error))
    */
  Restaurant.aggregate([
    {
      $group: {
        _id: null,
        max: { $max: '$id' },
      },
    },
  ])
    .then((result) => {
      let max = result[0].max + 1
      res.render('new', { max })
    })
    .catch((error) => console.log(error))
})

// 新增一筆餐廳資料
app.post('/restaurants', (req, res) => {
  Restaurant.aggregate([
    {
      $group: {
        _id: null,
        max: { $max: '$id' },
      },
    },
  ]).then((result) => {
    let id = result[0].max + 1

    Restaurant.create({
      id: id,
      name: req.body.name,
      name_en: req.body.name_en,
      category: req.body.category,
      phone: req.body.phone,
      location: req.body.location,
      google_map: req.body.google_map,
      rating: req.body.rating,
      description: req.body.description,
      image: req.body.image,
    })
      .then(() => {
        res.redirect('/')
      }) // 新增完成後導回首頁
      .catch((error) => console.log(error))
  })
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) =>
      res.render('show', {
        restaurant: restaurant,
        banner: true,
        addRestaurant: true,
      })
    )
    .catch((error) => console.log(error))
})

// 編輯內容頁
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id

  return Restaurant.findById(id)
    .lean()
    .then((restaurant) =>
      res.render('edit', { restaurant: restaurant, banner: false })
    )
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

// 刪除一筆餐廳資料
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  console.log('id:' + id)
  return Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
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
  res.render('index', {
    restaurants: restaurants,
    keyword: keyword,
    banner: true,
  })
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
