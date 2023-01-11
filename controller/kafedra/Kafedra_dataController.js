const validate = require('../../config/validate');
const Kafedra_data = require('../../models/kafedra/kafedra_data');
const Fakultet_data = require('../../models/fakultet/Fakultet_data')
const Kafedra_yonalish = require('../../models/kafedra/yonalish');
const Kafedra_hodim = require('../../models/kafedra/kafedra_hodim');
const removeMedia = require('../../config/fs');

class KafedraController{
    async Add(req, res) {
        try{
            const { error, value } = validate.postKafedraValidation.validate({...req.body});
            if(error){
                res.status(403).json({status:403, message:`Ma'lumotla to'gri kelmadi`})
                return
            }

            const Fakultet = await Fakultet_data.findOne({_id: value.fakultet_id});

            if(!Fakultet){
                res.status(403).json({status:403, message:`Fakultet id xato`})
                return 
            }

            const Kafedra = new Kafedra_data(value);
            Fakultet.kafedra.push(Kafedra._id);
            await Kafedra.save().then(t => t.populate('hodimlar', 'yonalish'))
            await Fakultet.save();

            res.status(200).json({status:200,success:true, message:`Yangi Kafedra qo'shildi`, data: Kafedra})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Edit(req, res) {
        try{
            const { error, value } = validate.postKafedraValidation.validate({...req.body});
            if(error){
                res.status(403).json({status:403, message:`Ma'lumotla to'gri kelmadi`})
                return
            }

            const Kafedra = await Kafedra_data.findOne({_id: req.params.id});
            if(!Kafedra){
                res.status(404).json({status:404, message:'Kafedra topilmadi :('});
                return
            }

            const Fakultet = await Fakultet_data.findOne({_id: value.fakultet_id});

            if(!Fakultet){
                res.status(403).json({status:403, message:`Fakultet id xato`})
                return 
            }
            
            const updated = await Kafedra_data.findByIdAndUpdate(req.params.id, {...value}, {new:true}).populate('yonalish', 'hodimlar');

            res.status(200).json({status:200,success:true, message:`Kafedra yangilandi`, data: updated})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Get(_, res) {
        try{
            const Kafedra = await Kafedra_data.find().populate('yonalish').populate('hodimlar');

            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: Kafedra})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async GetById(req, res) {
        try{
            const Kafedra = await Kafedra_data.findOne({_id:req.params.id}).populate('yonalish').populate('hodimlar');

            if(!Kafedra){
                res.status(404).json({status:404, message:'Kafedra topilmadi', success:false});
                return
            }
            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: Kafedra})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Delete(req, res) {
        try{
            const Kafedra = await Kafedra_data.findByIdAndDelete(req.params.id);
            if(!Kafedra){
                res.status(404).json({status:404, message:'Kafedra topilmadi', success:false});
                return
            }
            // Kafedraga tegishli hodimlarni o'chirish 
            const KafedraHodimlar = await Kafedra_hodim.find({kafedra_id: req.params.id});
            if(KafedraHodimlar.length >0){
                for(let i of KafedraHodimlar){
                    i.photo.forEach(e => removeMedia(e.split('/')[1]))
                }
                await Kafedra_hodim.deleteMany({kafedra_id: req.params.id})
            }

            // Kafedraga tegishli yo'nalishlarni o'chirish 
            const KafedraYonalishlar = await Kafedra_yonalish.find({kafedra_id: req.params.id});
            if(KafedraYonalishlar.length >0){
                await Kafedra_yonalish.deleteMany({kafedra_id: req.params.id})
            }

            // frontga response 
            res.status(200).json({status:200,success:true, message:`Yaxshi  delet qilindi`, data: Kafedra})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

}

module.exports = new KafedraController;