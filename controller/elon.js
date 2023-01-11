const Elon_data = require('../models/elon')

const validate = require("../config/validate");

const removeMedia = require('../config/fs');

class ElonController{
    async Add(req, res) {
        try{
            const { error, value } = validate.postNewsValidation.validate({...req.body});
            if(error || req.files.length <1){
                if(req.files){
                    req.files.forEach(e => removeMedia(e.filename))
                }
                res.status(403).json({status:403, message:`Ma'lumotla to'gri kelmadi`})
                return
            }
            
            let photos = []
            req.files.forEach(photo => photos.push(`uploads/${photo.filename}`))
            value.photo = photos

            const Elon = new Elon_data(value);
            await Elon.save();

            res.status(200).json({status:200,success:true, message:`E'lon qo'shildi`, data: Elon})
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
            const { error, value } = validate.postNewsValidation.validate({...req.body});
            if(error){
                if(req.files){
                    req.files.forEach(e => removeMedia(e.filename))
                }
                res.status(403).json({status:403, message:`Ma'lumotla to'gri kelmadi`})
                return
            }

           

            const Elon = await Elon_data.findOne({_id: req.params.id});
            if(!Elon){
                if(req.files){
                    req.files.forEach(e => removeMedia(e.filename))
                }
                res.status(404).json({status:404, message:'elon topilmadi :('});
                return
            }

            if(req.files){
                req.files.forEach(photo => Elon.photo.push(`uploads/${photo.filename}`))
                value.photo = Elon.photo
            }

            const updated = await Elon_data.findByIdAndUpdate(req.params.id, {...value}, {new:true});

            res.status(200).json({status:200,success:true, message:`elon yangilandi`, data: updated})
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
            const Elon = await Elon_data.find();

            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: Elon})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async GetById(req, res) {
        try{
            const Elon = await Elon_data.findOne({_id:req.params.id});

            if(!Elon){
                res.status(404).json({status:404, message:'elon topilmadi', success:false});
                return
            }
            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: Elon})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Delete(req, res) {
        try{            
            const Elon = await Elon_data.findByIdAndDelete(req.params.id);
            if(!Elon){
                res.status(404).json({status:404, message:'elon topilmadi :('});
                return
            }
 

                Elon.photo.forEach(e => removeMedia(e.split('/')[1]))

            res.status(200).json({status:200,success:true, message:`Yaxshi  delet qilindi`, data: Elon})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
}

module.exports = new ElonController;