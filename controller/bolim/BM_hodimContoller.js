const validate = require("../../config/validate");
const Bolim_data = require("../../models/bolim/BM_data");
const Bolim_hodim = require("../../models/bolim/BM_hodimlar");
const removeMedia = require('../../config/fs');

class BolimHodimController{
    async Add(req, res) {
        try{
            const { error, value } = validate.postBolimHodimValidation.validate({...req.body});
            if(error || req.files.length <1){
                if(req.files){
                    req.files.forEach(e => removeMedia(e.filename))
                }
                res.status(403).json({status:403, message:`Ma'lumotla to'gri kelmadi`})
                return
            }
            const Bolim = await Bolim_data.findOne({_id:value.bolim_id});
            if(!Bolim){
                if(req.files){
                    req.files.forEach(e => removeMedia(e.filename))
                }
                res.status(404).json({status:404, message:`Bolim id xato`})
                return
            }
            let photos = []
            req.files.forEach(photo => photos.push(`uploads/${photo.filename}`))
            value.photo = photos

            const BolimHodim = new Bolim_hodim(value);
            Bolim.hodimlar.push(BolimHodim._id);
            await BolimHodim.save();
            await Bolim.save();

            res.status(200).json({status:200,success:true, message:`Yangi hodim qo'shildi`, data: BolimHodim})
        }
        catch(e){
            if(req.files){
                req.files.forEach(e => removeMedia(e.filename))
            }
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Edit(req, res) {
        try{
            const { error, value } = validate.postBolimHodimValidation.validate({...req.body});
            if(error){
                if(req.files){
                    req.files.forEach(e => removeMedia(e.filename))
                }
                res.status(403).json({status:403, message:`Ma'lumotla to'gri kelmadi`})
                return
            }

           

            const BolimHodim = await Bolim_hodim.findOne({_id: req.params.id});
            if(!BolimHodim){
                if(req.files){
                    req.files.forEach(e => removeMedia(e.filename))
                }
                res.status(404).json({status:404, message:'hodim topilmadi :('});
                return
            }

            if(req.files){
                req.files.forEach(photo => BolimHodim.photo.push(`uploads/${photo.filename}`))
                value.photo = BolimHodim.photo
            }

            const updated = await Bolim_hodim.findByIdAndUpdate(req.params.id, {...value}, {new:true});

            res.status(200).json({status:200,success:true, message:`hodim yangilandi`, data: updated})
        }
        catch(e){
            if(req.files){
                req.files.forEach(e => removeMedia(e.filename))
            }
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Get(_, res) {
        try{
            const BolimHodim = await Bolim_hodim.find();

            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: BolimHodim})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async GetById(req, res) {
        try{
            const BolimHodim = await Bolim_hodim.findOne({_id:req.params.id});

            if(!BolimHodim){
                res.status(404).json({status:404, message:'Hodim topilmadi', success:false});
                return
            }
            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: BolimHodim})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Delete(req, res) {
        try{            
            const BolimHodim = await Bolim_hodim.findByIdAndDelete(req.params.id);
            if(!BolimHodim){
                res.status(404).json({status:404, message:'hodim topilmadi :('});
                return
            }
 
            await Bolim_data.updateMany({hodimlar:{ $all : [req.params.id]}}, {
                $pull: {
                    hodimlar: req.params.id
                }
            });

                BolimHodim.photo.forEach(e => removeMedia(e.split('/')[1]))

            res.status(200).json({status:200,success:true, message:`Yaxshi  delet qilindi`, data: BolimHodim})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
}

module.exports = new BolimHodimController;