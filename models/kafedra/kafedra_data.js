const mongoose = require('mongoose')
const KafedraSchema = mongoose.Schema({
     
    haqida_uz: String,
    haqida_ru: String,
    haqida_en: String,
    maqsad_uz: String,
    maqsad_en: String,
    maqsad_ru: String,
    title_uz:  String,
    title_ru:  String,
    title_en:  String,
    fakultet_id: {type: mongoose.Schema.Types.ObjectId, ref:'Fakultet', required:true  },
    yonalish: [
        {
            ref: 'KafedraYonalish',
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    hodimlar: [
        {
            ref: 'KafedraHodim',
            type: mongoose.Schema.Types.ObjectId
        }
    ], 
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('Kafedra', KafedraSchema)