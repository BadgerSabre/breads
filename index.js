require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const breadRoutes = require('./controllers/breads_controller')
const bakerRoutes = require('./controllers/baker_controller')
const methodOverride = require('method-override')

const app = express()

// Middleware
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))


// Routes
app.use('/breads', breadRoutes)
app.use('/bakers', bakerRoutes)

app.get('/', (req, res) => {6
    res.send("Welcome to BREAD!")
})

// DB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`listening on port ${PORT}`))