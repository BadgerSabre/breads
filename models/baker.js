const mongoose = require('mongoose')

const bakerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: ['Rachel', 'Monica', 'Joey', 'Ross', 'Phoebe', 'Chandler']
    },
    startDate: {
        type: Date,
        required: true
    },
    bio: {
        type: String
    }
},{
    toJSON: { virtuals: true }
})

// Virtuals
bakerSchema.virtual('breads', {
    ref: 'Bread',
    localField: '_id',
    foreignField: 'baker'
})

module.exports = mongoose.model('Baker', bakerSchema)