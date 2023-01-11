const validate = require("../../config/validate");
const Markaz_data = require("../../models/markaz/markaz");
const Markaz_hodim = require("../../models/markaz/markaz_hodim");
const removeMedia = require('../../config/fs');

class MarkazHodimController{
    async Add(req, res) {
        try{
            const { error, value } = validate.postMarkazHodimValidation.validate({...req.body});
            if(error || req.files.length <1){
                if(req.files){
                    req.files.forEach(e => removeMedia(e.filename))
                }
                res.status(403).json({status:403, message:`Ma'lumotla to'gri kelmadi`})
                return
            }
            const Markaz = await Markaz_data.findOne({_id:value.markaz_id});
            if(!Markaz){
                if(req.files){
                    req.files.forEach(e => removeMedia(e.filename))
                }
                res.status(404).json({status:404, message:`Markaz id xato`})
                return
            }
            let photos = []
            req.files.forEach(photo => photos.push(`uploads/${photo.filename}`))
            value.photo = photos

            const MarkazHodim = new Markaz_hodim(value);
            Markaz.hodimlar.push(MarkazHodim._id);
            await MarkazHodim.save();
            await Markaz.save();

            res.status(200).json({status:200,success:true, message:`Yangi hodim qo'shildi`, data: MarkazHodim})
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
            const { error, value } = validate.postMarkazHodimValidation.validate({...req.body});
            if(error){
                if(req.files){
                    req.files.forEach(e => removeMedia(e.filename))
                }
                res.status(403).json({status:403, message:`Ma'lumotla to'gri kelmadi`})
                return
            }

           

            const MarkazHodim = await Markaz_hodim.findOne({_id: req.params.id});
            if(!MarkazHodim){
                if(req.files){
                    req.files.forEach(e => removeMedia(e.filename))
                }
                res.status(404).json({status:404, message:'hodim topilmadi :('});
                return
            }

            if(req.files){
                req.files.forEach(photo => MarkazHodim.photo.push(`uploads/${photo.filename}`))
                value.photo = MarkazHodim.photo
            }

            const updated = await Markaz_hodim.findByIdAndUpdate(req.params.id, {...value}, {new:true});

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
            const MarkazHodim = await Markaz_hodim.find();

            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: MarkazHodim})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async GetById(req, res) {
        try{
            const MarkazHodim = await Markaz_hodim.findOne({_id:req.params.id});

            if(!MarkazHodim){
                res.status(404).json({status:404, message:'Hodim topilmadi', success:false});
                return
            }
            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: MarkazHodim})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Delete(req, res) {
        try{            
            const MarkazHodim = await Markaz_hodim.findByIdAndDelete(req.params.id);
            if(!MarkazHodim){
                res.status(404).json({status:404, message:'hodim topilmadi :('});
                return
            }
 
            await Markaz_data.updateMany({hodimlar:{ $all : [req.params.id]}}, {
                $pull: {
                    hodimlar: req.params.id
                }
            });

                MarkazHodim.photo.forEach(e => removeMedia(e.split('/')[1]))

            res.status(200).json({status:200,success:true, message:`Yaxshi  delet qilindi`, data: MarkazHodim})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
}

module.exports = new MarkazHodimController;