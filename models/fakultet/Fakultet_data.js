const mongoose = require('mongoose')
const FakultetSchema = mongoose.Schema({
    haqida_uz: String,
    haqida_ru: String,
    haqida_en: String,
    maqsad_uz: String,
    maqsad_en: String,
    maqsad_ru: String,
    title_uz:  String,
    title_ru:  String,
    title_en:  String,
    kafedra: [
        {
            ref: 'Kafedra',
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    hodimlar: [
        {
            ref: 'FakultetHodimSchema',
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('Fakultet', FakultetSchema)