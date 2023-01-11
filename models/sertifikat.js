const mongoose = require('mongoose')

const SertifikatSchema = mongoose.Schema({
    name: String,
    id: Number,
    photo: {
        type: Array,
        data: Buffer
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('SertifikatSchema', SertifikatSchema)