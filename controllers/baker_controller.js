const express = require('express')
const router = express.Router()
const Baker = require('../models/baker')
const BakerSeedData = require('../models/bakerSeed')

router.get('/seed', async (req, res) => {
    try {
        await Baker.insertMany(BakerSeedData)
        res.redirect('/breads')
     } catch (error) {
        console.log(error)
        res.send('ERROR')
     }
})

router.get('/', async (req, res) => {
    let bakers = await Baker.find().populate('breads')
    res.send(bakers)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    let baker = await Baker.findById(id).populate('breads')
    console.log(baker)
    res.render('bakerShow', {
        baker
    })
})

module.exports = router