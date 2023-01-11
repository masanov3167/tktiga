const validate = require("../../config/validate");
const Kafedra_data = require("../../models/kafedra/kafedra_data");
const Kafedra_hodim = require("../../models/kafedra/kafedra_hodim");
const removeMedia = require('../../config/fs');

class KafedraHodimController{
    async Add(req, res) {
        try{
            const { error, value } = validate.postKafedraHodimValidation.validate({...req.body});
            if(error || req.files.length <1){
                if(req.files){
                    req.files.forEach(e => removeMedia(e.filename))
                }
                res.status(403).json({status:403, message:`Ma'lumotla to'gri kelmadi`})
                return
            }
            const Kafedra = await Kafedra_data.findOne({_id:value.kafedra_id});
            if(!Kafedra){
                if(req.files){
                    req.files.forEach(e => removeMedia(e.filename))
                }
                res.status(404).json({status:404, message:`Kafedra id xato`})
                return
            }
            let photos = []
            req.files.forEach(photo => photos.push(`uploads/${photo.filename}`))
            value.photo = photos

            const KafedraHodim = new Kafedra_hodim(value);
            Kafedra.hodimlar.push(KafedraHodim._id);
            await KafedraHodim.save();
            await Kafedra.save();

            res.status(200).json({status:200,success:true, message:`Yangi hodim qo'shildi`, data: KafedraHodim})
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
            const { error, value } = validate.postKafedraHodimValidation.validate({...req.body});
            if(error){
                if(req.files){
                    req.files.forEach(e => removeMedia(e.filename))
                }
                res.status(403).json({status:403, message:`Ma'lumotla to'gri kelmadi`})
                return
            }

    
            const KafedraHodim = await Kafedra_hodim.findOne({_id: req.params.id});
            if(!KafedraHodim){
                if(req.files){
                    req.files.forEach(e => removeMedia(e.filename))
                }
                res.status(404).json({status:404, message:'hodim topilmadi :('});
                return
            }

            if(req.files){
                req.files.forEach(photo => KafedraHodim.photo.push(`uploads/${photo.filename}`))
                value.photo = KafedraHodim.photo
            }

            const updated = await Kafedra_hodim.findByIdAndUpdate(req.params.id, {...value}, {new:true});

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
            const KafedraHodim = await Kafedra_hodim.find();

            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: KafedraHodim})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async GetById(req, res) {
        try{
            const KafedraHodim = await Kafedra_hodim.findOne({_id:req.params.id});

            if(!KafedraHodim){
                res.status(404).json({status:404, message:'Hodim topilmadi :(', success:false});
                return
            }
            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: KafedraHodim})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Delete(req, res) {
        try{
            const KafedraHodim = await Kafedra_hodim.findOne({_id: req.params.id});
            if(!KafedraHodim){
                res.status(404).json({status:404, message:'hodim topilmadi :('});
                return
            }
            await Kafedra_hodim.findByIdAndDelete(req.params.id)
            await Kafedra_data.updateMany({hodimlar:{ $all : [req.params.id]}}, {
                $pull: {
                    hodimlar: req.params.id
                }
            });

                KafedraHodim.photo.forEach(e => removeMedia(e.split('/')[1]))

            res.status(200).json({status:200,success:true, message:`Yaxshi  delet qilindi`, data: KafedraHodim})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
}

module.exports = new KafedraHodimController;