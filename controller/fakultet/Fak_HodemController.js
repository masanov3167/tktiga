const validate = require("../../config/validate");
const Fakultet_data = require("../../models/fakultet/Fakultet_data");
const Fakultet_hodim = require("../../models/fakultet/Fakultet_hodim");
const removeMedia = require('../../config/fs');

class FakultetHodimController{
    async Add(req, res) {
        try{
            const { error, value } = validate.postFakultetHodimValidation.validate({...req.body});
            if(error || req.files.length <1){
                if(req.files){
                    req.files.forEach(e => removeMedia(e.filename))
                }
                res.status(403).json({status:403, message:`Ma'lumotla to'gri kelmadi`})
                return
            }
            const Fakultet = await Fakultet_data.findOne({_id:value.fakultet_id});
            if(!Fakultet){
                if(req.files){
                    req.files.forEach(e => removeMedia(e.filename))
                }
                res.status(404).json({status:404, message:`Fakultet id xato`})
                return
            }
            let photos = []
            req.files.forEach(photo => photos.push(`uploads/${photo.filename}`))
            value.photo = photos

            const FakultetHodim = new Fakultet_hodim(value);
            Fakultet.hodimlar.push(FakultetHodim._id);
            await FakultetHodim.save();
            await Fakultet.save();

            res.status(200).json({status:200,success:true, message:`Yangi hodim qo'shildi`, data: FakultetHodim})
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
            const { error, value } = validate.postFakultetHodimValidation.validate({...req.body});
            if(error){
                if(req.files){
                    req.files.forEach(e => removeMedia(e.filename))
                }
                res.status(403).json({status:403, message:`Ma'lumotla to'gri kelmadi`})
                return
            }

           

            const FakultetHodim = await Fakultet_hodim.findOne({_id: req.params.id});
            if(!FakultetHodim){
                if(req.files){
                    req.files.forEach(e => removeMedia(e.filename))
                }
                res.status(404).json({status:404, message:'hodim topilmadi :('});
                return
            }

            if(req.files){
                req.files.forEach(photo => FakultetHodim.photo.push(`uploads/${photo.filename}`))
                value.photo = FakultetHodim.photo
            }

            const updated = await Fakultet_hodim.findByIdAndUpdate(req.params.id, {...value}, {new:true});

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
            const FakultetHodim = await Fakultet_hodim.find();

            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: FakultetHodim})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async GetById(req, res) {
        try{
            const FakultetHodim = await Fakultet_hodim.findOne({_id:req.params.id});

            if(!FakultetHodim){
                res.status(404).json({status:404, message:'Hodim topilmadi', success:false});
                return
            }
            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: FakultetHodim})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Delete(req, res) {
        try{
            const FakultetHodim = await Fakultet_hodim.findOne({_id: req.params.id});
            if(!FakultetHodim){
                res.status(404).json({status:404, message:'hodim topilmadi :('});
                return
            }
 
            await Fakultet_hodim.findByIdAndDelete(req.params.id);
            await Fakultet_data.updateMany({hodimlar:{ $all : [req.params.id]}}, {
                $pull: {
                    hodimlar: req.params.id
                }
            });

                FakultetHodim.photo.forEach(e => removeMedia(e.split('/')[1]))

            res.status(200).json({status:200,success:true, message:`Yaxshi  delet qilindi`, data: FakultetHodim})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
}

module.exports = new FakultetHodimController;