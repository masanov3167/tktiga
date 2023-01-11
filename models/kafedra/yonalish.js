const mongoose = require("mongoose")

const KafedraYonalishSchema = mongoose.Schema({
    title_uz: String,
    title_ru: String,
    title_en: String,
    kafedra_id: {type: mongoose.Schema.Types.ObjectId, ref:'Kafedra', required:true  }
})

module.exports = mongoose.model("KafedraYonalish", KafedraYonalishSchema)