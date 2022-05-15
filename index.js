require('dotenv').config()
const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send("Welcome to BREAD!")
})

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`listening on port ${PORT}`))