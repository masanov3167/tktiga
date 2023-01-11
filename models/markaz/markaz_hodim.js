const mongoose = require('mongoose')
const BolimSchema = mongoose.Schema({
    job_uz:String,
    job_ru:String,
    job_en:String,
    name_uz:String,
    name_ru:String,
    name_en:String,
    tel: String,
    email:String,
    photo: {
        type: Array,
        data: Buffer
    },
    bolim_id: {type: mongoose.Schema.Types.ObjectId, ref:'Markaz', required:true  },
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('MarkazHodim', BolimSchema)