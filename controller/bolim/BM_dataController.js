const validate = require('../../config/validate');
const Bolim_data = require('../../models/bolim/BM_data');
const Bolim_hodim = require('../../models/bolim/BM_hodimlar');

class BolimController{
    async Add(req, res) {
        try{
            const { error, value } = validate.postFakultetValidation.validate({...req.body});
            if(error){
                res.status(403).json({status:403, message:`Ma'lumotla to'gri kelmadi`})
                return
            }

            const Bolim = new Bolim_data(value);
            await Bolim.save().then(t => t.populate('hodimlar'))

            res.status(200).json({status:200,success:true, message:`Yangi Bo'lim qo'shildi`, data: Bolim})
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

            const updated = await Bolim_data.findByIdAndUpdate(req.params.id, {...value}, {new:true}).populate('hodimlar');

            if(!updated){
                res.status(404).json({status:404, message:'Bolim topilmadi :('});
                return
            }
            res.status(200).json({status:200,success:true, message:`Bolim yangilandi`, data: updated})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Get(_, res) {
        try{
            const Bolim = await Bolim_data.find().populate('hodimlar');

            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: Bolim})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async GetById(req, res) {
        try{
            const Bolim = await Bolim_data.findOne({_id:req.params.id}).populate('hodimlar');

            if(!Bolim){
                res.status(404).json({status:404, message:'Bolim id xato', success:false});
                return
            }

            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: Bolim})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Delete(req, res) {
        try{
            const Bolim = await Bolim_data.findByIdAndDelete(req.params.id);

            if(!Bolim){
                res.status(404).json({status:404, message:'Bo`lim id xato', success:false});
                return
            }
            // Bolimga tegishli hodimlarni o'chirish 
           const BolimHodimlar = await Bolim_hodim.find({bolim_id: req.params.id});
           for(let i of BolimHodimlar){
               i.photo.forEach(e => removeMedia(e.split('/')[1]))
           }
           await Bolim_hodim.deleteMany({bolim_id: req.params.id})

            res.status(200).json({status:200,success:true, message:`Yaxshi  delet qilindi`, data: Bolim})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
}

module.exports = new BolimController;
