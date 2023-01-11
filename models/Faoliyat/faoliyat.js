const mongoose = require('mongoose')
const FaoliyatSchema = mongoose.Schema({
    title_uz:String,
    title_ru:String,
    title_en:String,
    ref_id: { type: [Schema.Types.ObjectId], refPath: 'model_type' },
    model_type: {  type: String, enum: ['Student', 'Professor', 'Administrator' ], required: true },
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('Faoliyat', FaoliyatSchema)