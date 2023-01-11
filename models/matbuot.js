const mongoose = require('mongoose')

const MatbuotSchema = mongoose.Schema({
    title_uz: String,
    title_ru: String,
    title_en: String,
    description_uz: String,
    description_ru: String,
    description_en: String,
    photo: {
        type: Array,
        data: Buffer
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('Matbuot', MatbuotSchema)