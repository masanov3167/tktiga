const mongoose = require('mongoose')

const KafedraHodimSchema = mongoose.Schema({
    job_uz:String,
    job_ru:String,
    job_en:String,
    name_uz:String,
    name_ru:String,
    name_en:String,
    tell: String,
    email:String,
    photo: {
        type: Array,
        data: Buffer
    },
    kafedra_id: {type: mongoose.Schema.Types.ObjectId, ref:'Kafedra', required:true  },
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('KafedraHodim', KafedraHodimSchema)