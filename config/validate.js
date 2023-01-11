const  joi = require('joi');

class Validate {
    loginValidation = joi.object().keys({
        name: joi.string().min(3).required(),
        password: joi.string().min(3).required(),
        email: joi.string().min(3).required()
    })

    postFakultetValidation = joi.object().keys({
        haqida_uz: joi.required(),
        haqida_ru: joi.required(),
        haqida_en: joi.required(),
        maqsad_uz: joi.required(),
        maqsad_en: joi.required(),
        maqsad_ru: joi.required(),
        title_uz:  joi.string().min(3).required(),
        title_ru:  joi.string().min(3).required(),
        title_en:  joi.string().min(3).required()
    })

    postFakultetHodimValidation = joi.object().keys({
        job_uz: joi.string().min(3).required(),
        job_ru: joi.string().min(3).required(),
        job_en: joi.string().min(3).required(),
        name_uz: joi.string().min(3).required(),
        name_ru: joi.string().min(3).required(),
        name_en: joi.string().min(3).required(),
        tell:   joi.string().min(3).required(),
        email:  joi.string().min(3).required(),
        fakultet_id:  joi.string().length(24).required()
    })

    postBolimHodimValidation = joi.object().keys({
        job_uz: joi.string().min(3).required(),
        job_ru: joi.string().min(3).required(),
        job_en: joi.string().min(3).required(),
        name_uz: joi.string().min(3).required(),
        name_ru: joi.string().min(3).required(),
        name_en: joi.string().min(3).required(),
        tell:   joi.string().min(3).required(),
        email:  joi.string().min(3).required(),
        bolim_id:  joi.string().length(24).required()
    })

    postMarkazHodimValidation = joi.object().keys({
        job_uz: joi.string().min(3).required(),
        job_ru: joi.string().min(3).required(),
        job_en: joi.string().min(3).required(),
        name_uz: joi.string().min(3).required(),
        name_ru: joi.string().min(3).required(),
        name_en: joi.string().min(3).required(),
        tell:   joi.string().min(3).required(),
        email:  joi.string().min(3).required(),
        markaz_id:  joi.string().length(24).required()
    })

    postKafedraValidation = joi.object().keys({
        haqida_uz: joi.string().min(3).required(),
        haqida_ru: joi.string().min(3).required(),
        haqida_en: joi.string().min(3).required(),
        maqsad_uz: joi.string().min(3).required(),
        maqsad_en: joi.string().min(3).required(),
        maqsad_ru: joi.string().min(3).required(),
        title_uz:  joi.string().min(3).required(),
        title_ru:  joi.string().min(3).required(),
        title_en:  joi.string().min(3).required(),
        fakultet_id: joi.string().length(24).required()
    })

    postKafedraHodimValidation = joi.object().keys({
        job_uz: joi.string().min(3).required(),
        job_ru: joi.string().min(3).required(),
        job_en: joi.string().min(3).required(),
        name_uz: joi.string().min(3).required(),
        name_ru: joi.string().min(3).required(),
        name_en: joi.string().min(3).required(),
        tell:   joi.string().min(3).required(),
        email:  joi.string().min(3).required(),
        kafedra_id:  joi.string().length(24).required()
    })

    postKafedraYonalishValidation = joi.object().keys({
        title_uz: joi.string().min(3).required(),
        title_ru: joi.string().min(3).required(),
        title_en: joi.string().min(3).required(),
        kafedra_id:  joi.string().length(24).required()
    })

    postNewsValidation = joi.object().keys({
        title_uz: joi.string().min(3).required(),
        title_ru: joi.string().min(3).required(),
        title_en: joi.string().min(3).required(),
        body_uz: joi.required(),
        body_ru: joi.required(),
        body_en: joi.required(),
    })
}

module.exports = new Validate;