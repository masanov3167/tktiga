const News_data = require('../models/news')

const validate = require("../config/validate");

const removeMedia = require('../config/fs');

class NewsController{
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

            const News = new News_data(value);
            await News.save();

            res.status(200).json({status:200,success:true, message:`Yangilik qo'shildi`, data: News})
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

           

            const News = await News_data.findOne({_id: req.params.id});
            if(!News){
                if(req.files){
                    req.files.forEach(e => removeMedia(e.filename))
                }
                res.status(404).json({status:404, message:'yangilik topilmadi :('});
                return
            }

            if(req.files){
                req.files.forEach(photo => News.photo.push(`uploads/${photo.filename}`))
                value.photo = News.photo
            }

            const updated = await News_data.findByIdAndUpdate(req.params.id, {...value}, {new:true});

            res.status(200).json({status:200,success:true, message:`yangilik yangilandi`, data: updated})
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
            const News = await News_data.find();

            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: News})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async GetById(req, res) {
        try{
            const News = await News_data.findOne({_id:req.params.id});

            if(!News){
                res.status(404).json({status:404, message:'yangilik topilmadi', success:false});
                return
            }
            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: News})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Delete(req, res) {
        try{            
            const News = await News_data.findByIdAndDelete(req.params.id);
            if(!News){
                res.status(404).json({status:404, message:'yangilik topilmadi :('});
                return
            }
 

                News.photo.forEach(e => removeMedia(e.split('/')[1]))

            res.status(200).json({status:200,success:true, message:`Yaxshi  delet qilindi`, data: News})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
}

module.exports = new NewsController;