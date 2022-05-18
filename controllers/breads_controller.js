const express = require('express')
const router = express.Router()
const Bread = require('../models/bread')


// Get all Bread
router.get('/', (req, res) => {
    res.render('index', {
        breads: Bread,
        title: 'Bread'
    })
})

// Get Bread by index
router.get('/:arrayIndex', (req, res) => {
    const { arrayIndex } = req.params
    res.render('Show', {
        bread: Bread[arrayIndex]
    })
})

module.exports = router