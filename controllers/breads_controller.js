const express = require('express')
const router = express.Router()

const Bread = require('../models/bread')
const Baker = require('../models/baker')
const seedData = require('../models/seed')

router.get('/new', async (req, res) => {
    const bakers = await Baker.find()
    res.render('new', { bakers })
})

router.get('/seed', async (req, res) => {
    try {
       await Bread.insertMany(seedData)
       res.redirect('/breads')
    } catch (error) {
        console.log(error)
        res.send('ERROR')
    }
})

// Get all Bread
router.get('/', async (req, res) => {
    try {
        const bread = await Bread.find()
        const bakers = await Baker.find()
        res.render('index', {
            breads: bread,
            bakers,
            title: 'Bread'
        })
    } catch (error) {
        console.log(error)
        res.send("ERROR")
    }
})

// Get Bread by index
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const bread = await Bread.findById(id).populate('baker')
        res.render('Show', {
            bread
        })
    } catch (error) {
        console.log(error)
        res.send("ERROR")
    }
})

// Create New Bread
router.post('/', async (req, res) => {
    try {
        if(!req.body.image) {
            delete req.body['image']
        }
        if(req.body.hasGluten === 'on') {
            req.body.hasGluten = true
        } else {
            req.body.hasGluten = false
        }
    
        await Bread.create(req.body)

        res.redirect('/breads')  
    } catch (error) {
        console.log(error)
        res.send("ERROR")
    }
})

// Delete a bread
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        await Bread.findByIdAndDelete(id)
        res.status(303).redirect('/breads')
    } catch (error) {
        console.log(error)
        res.send("ERROR")
    }
})

// Get Edit Page
router.get('/:id/edit', async (req, res) => {
    const { id } = req.params
    const bread = await Bread.findById(id).populate('baker')
    const bakers = await Baker.find()
    res.render('edit', {
        bread,
        bakers
    })
})

// Update Bread
router.put('/:id', async (req, res) => {
    const { id } = req.params
    if(req.body.hasGluten === 'on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }

    await Bread.findByIdAndUpdate(id, req.body)
    res.redirect(`/breads/${id}`)
})

module.exports = router