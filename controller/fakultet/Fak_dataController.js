const removeMedia = require('../../config/fs');
const validate = require('../../config/validate');
const Fakultet_data = require('../../models/fakultet/Fakultet_data');
const Fakultet_hodim = require('../../models/fakultet/Fakultet_hodim');
const kafedra_data = require('../../models/kafedra/kafedra_data');
const kafedra_hodim = require('../../models/kafedra/kafedra_hodim');
const kafedra_yonalish = require('../../models/kafedra/yonalish');

class FakultetController{
    async Add(req, res) {
        try{
            const { error, value } = validate.postFakultetValidation.validate({...req.body});
            if(error){
                res.status(403).json({status:403, message:`Ma'lumotla to'gri kelmadi`})
                return
            }

            const Fakultet = new Fakultet_data(value);
            await Fakultet.save().then(t => t.populate('hodimlar', 'kafedra'))

            res.status(200).json({status:200,success:true, message:`Yangi fakultet qo'shildi`, data: Fakultet})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Edit(req, res) {
        try{
            const { error, value } = validate.postFakultetValidation.validate({...req.body});
            if(error){
                res.status(403).json({status:403, message:`Ma'lumotla to'gri kelmadi`})
                return
            }

            const Fakultet = await Fakultet_data.find({_id: req.params.id});
            if(Fakultet.length){
                res.status(404).json({status:404, message:'Fakultet topilmadi :('});
                return
            }
            const updated = await Fakultet.findByIdAndUpdate(req.params.id, {...value}, {new:true}).populate('kafedra', 'hodimlar');

            res.status(200).json({status:200,success:true, message:`fakultet yangilandi`, data: updated})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Get(_, res) {
        try{
            const Fakultet = await Fakultet_data.find().populate('kafedra').populate('hodimlar');

            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: Fakultet})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async GetById(req, res) {
        try{
            const Fakultet = await Fakultet_data.findOne({_id:req.params.id}).populate('kafedra').populate('hodimlar');

            if(!Fakultet){
                res.status(404).json({status:404, message:'Fakultet id xato', success:false});
                return
            }

            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: Fakultet})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Delete(req, res) {
        try{
            const Fakultet = await Fakultet_data.findByIdAndDelete(req.params.id);

            // fakultetga tegishli hodimlarni o'chirish 
            const FakultetHodimlar = await Fakultet_hodim.find({fakultet_id: req.params.id});
            for(let i of FakultetHodimlar){
                i.photo.forEach(e => removeMedia(e.split('/')[1]))
            }
            await Fakultet_hodim.deleteMany({fakultet_id: req.params.id})

            // fakultetga tegishli kafedralarni o'chirish 
            const FakultetKafedralar = await kafedra_data.find({fakultet_id: req.params.id});
            if(FakultetKafedralar.length >0){
                await kafedra_data.deleteMany({fakultet_id: req.params.id})
                
                for(let i of FakultetKafedralar){
                    // O'chirilgan kafedraga tegishli hodimlarni o'chirish 
                    const KafedraHodimlar = await kafedra_hodim.find({kafedra_id: i._id});
                    if(KafedraHodimlar.length>0){
                        await kafedra_hodim.deleteMany({kafedra_id: i._id});
                        for(let e of KafedraHodimlar){
                            e.photo.forEach(item => removeMedia(item.split('/')[1]))
                        }
                    }
                    // O'chirilgan kafedraga tegishli yo'nalishlarni o'chirish
                    await kafedra_yonalish.deleteMany({kafedra_id: i._id})
                }
            }
            // frontga response 
            res.status(200).json({status:200,success:true, message:`Yaxshi  delet qilindi`, data: Fakultet})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
}

module.exports = new FakultetController;
