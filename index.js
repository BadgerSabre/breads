require('dotenv').config()
const express = require('express')
const breadRoutes = require('./controllers/breads_controller')

const app = express()

// Middleware
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

// Middleware
app.use(express.static('public'))


// Routes
app.use('/breads', breadRoutes)

app.get('/', (req, res) => {6
    res.send("Welcome to BREAD!")
})

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`listening on port ${PORT}`))