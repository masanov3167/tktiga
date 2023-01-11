const validate = require('../../config/validate');
const Markaz_data = require('../../models/markaz/markaz');
const Markaz_hodim = require('../../models/markaz/markaz_hodim');

class MarkazController{
    async Add(req, res) {
        try{
            const { error, value } = validate.postFakultetValidation.validate({...req.body});
            if(error){
                res.status(403).json({status:403, message:`Ma'lumotla to'gri kelmadi`})
                return
            }

            const Markaz = new Markaz_data(value);
            await Markaz.save().then(t => t.populate('hodimlar'))

            res.status(200).json({status:200,success:true, message:`Yangi Markaz qo'shildi`, data: Markaz})
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

            const updated = await Markaz_data.findByIdAndUpdate(req.params.id, {...value}, {new:true}).populate('hodimlar');

            if(!updated){
                res.status(404).json({status:404, message:'Markaz topilmadi :('});
                return
            }
            res.status(200).json({status:200,success:true, message:`Markaz yangilandi`, data: updated})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Get(_, res) {
        try{
            const Markaz = await Markaz_data.find().populate('hodimlar');

            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: Markaz})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async GetById(req, res) {
        try{
            const Markaz = await Markaz_data.findOne({_id:req.params.id}).populate('hodimlar');

            if(!Markaz){
                res.status(404).json({status:404, message:'Markaz id xato', success:false});
                return
            }

            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: Markaz})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Delete(req, res) {
        try{
            const Markaz = await Markaz_data.findByIdAndDelete(req.params.id);

            if(!Markaz){
                res.status(404).json({status:404, message:'Markaz id xato', success:false});
                return
            }
            // Markazga tegishli hodimlarni o'chirish 
           const MarkazHodimlar = await Markaz_hodim.find({markaz_id: req.params.id});
           for(let i of MarkazHodimlar){
               i.photo.forEach(e => removeMedia(e.split('/')[1]))
           }
           await Markaz_hodim.deleteMany({Markaz_id: req.params.id})

            res.status(200).json({status:200,success:true, message:`Yaxshi  delet qilindi`, data: Markaz})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
}

module.exports = new MarkazController;
