const express = require('express')
const router = express.Router()
const Bread = require('../models/bread')

router.get('/new', (req, res) => {
    res.render('new')
})

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
        bread: Bread[arrayIndex],
        index: arrayIndex
    })
})

// Create New Bread
router.post('/', (req, res) => {
    if (!req.body.image) {
        req.body.image = 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
    }
    if(req.body.hasGluten === 'on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }

    Bread.push(req.body)
    res.redirect('/breads')
})

// Delete a bread
router.delete('/:arrayIndex', (req, res) => {
    Bread.splice(req.params.arrayIndex, 1)
    res.status(303).redirect('/breads')
})

// Get Edit Page
router.get('/:arrayIndex/edit', (req, res) => {
    const { arrayIndex } = req.params
    res.render('edit', {
        bread: Bread[arrayIndex],
        index: arrayIndex
    })
})

// Update Bread
router.put('/:arrayIndex', (req, res) => {
    const { arrayIndex } = req.params
    if(req.body.hasGluten === 'on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }

    Bread[arrayIndex] = req.body
    res.redirect(`/breads/${arrayIndex}`)
})

module.exports = router