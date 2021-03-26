// app.js
// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const mongoose = require('mongoose')

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

// routes setting
app.get('/', (req, res) => {
  // past the restaurant data into 'index' partial template
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(
    (restaurant) => restaurant.id.toString() === req.params.restaurant_id
  )
  res.render('show', { restaurant: restaurant })
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
