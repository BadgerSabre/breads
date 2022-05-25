const express = require('express')
const router = express.Router()
const Bread = require('../models/bread')

router.get('/new', (req, res) => {
    res.render('new')
})

// Get all Bread
router.get('/', async (req, res) => {
    try {
        const bread = await Bread.find()
        res.render('index', {
            breads: bread,
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
        const bread = await Bread.findById(id)
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
    const bread = await Bread.findById(id)
    res.render('edit', {
        bread
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