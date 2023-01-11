const mongoose = require('mongoose')
const BolimSchema = mongoose.Schema({
    maqsad_uz: String,
    maqsad_en: String,
    maqsad_ru: String,
    haqida_uz: String,
    haqida_ru: String,
    haqida_en: String,
    title_uz:String,
    title_ru:String,
    title_en:String,
    hodimlar: [
        {
            ref: 'BolimHodim',
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('Bolim', BolimSchema)