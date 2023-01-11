const validate = require('../../config/validate');
const Kafedra_data = require('../../models/kafedra/kafedra_data');
const Kafedra_yonalish = require('../../models/kafedra/yonalish');

class KafedraYonalishController{
    async Add(req, res) {
        try{
            const { error, value } = validate.postKafedraYonalishValidation.validate({...req.body});
            if(error){
                res.status(403).json({status:403, message:`Ma'lumotla to'gri kelmadi`})
                return
            }

            const Kafedra = await Kafedra_data.findOne({_id: value.kafedra_id});

            if(!Kafedra){
                res.status(403).json({status:403, message:`Kafedra id xato`})
                return 
            }

            const KafedraYonalish = new Kafedra_yonalish(value);
            Kafedra.yonalish.push(KafedraYonalish._id);
            await KafedraYonalish.save()
            await Kafedra.save();

            res.status(200).json({status:200,success:true, message:`Yangi yo'nalish qo'shildi`, data: KafedraYonalish})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Edit(req, res) {
        try{
            const { error, value } = validate.postKafedraYonalishValidation.validate({...req.body});
            if(error){
                res.status(403).json({status:403, message:`Ma'lumotla to'gri kelmadi`})
                return
            }

            const KafedraYonalish = await Kafedra_yonalish.findOne({_id: req.params.id});
            if(!KafedraYonalish){
                res.status(404).json({status:404, message:'Kafedra yo`nalish topilmadi :('});
                return
            }

            const Kafedra = await Kafedra_data.findOne({_id: value.kafedra_id});

            if(!Kafedra){
                res.status(403).json({status:403, message:`Kafedra id xato`})
                return 
            }
            
            const updated = await Kafedra_yonalish.findByIdAndUpdate(req.params.id, {...value}, {new:true});

            res.status(200).json({status:200,success:true, message:`Kafedra yo'nalish yangilandi`, data: updated})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Get(_, res) {
        try{
            const KafedraYonalish = await Kafedra_yonalish.find();

            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: KafedraYonalish})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async GetById(req, res) {
        try{
            const KafedraYonalish = await Kafedra_yonalish.findOne({_id:req.params.id});

            if(!KafedraYonalish){
                res.status(404).json({status:404, message:'Kafedra topilmadi', success:false});
                return
            }
            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: KafedraYonalish})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Delete(req, res) {
        try{
            const KafedraYonalish = await Kafedra_yonalish.findByIdAndDelete(req.params.id);
            if(!KafedraYonalish){
                res.status(404).json({status:404, message:'Kafedra yo`nalish topilmadi', success:false});
                return
            }
           
            await Kafedra_data.updateMany({yonalish:{ $all : [req.params.id]}}, {
                $pull: {
                    yonalish: req.params.id
                }
            });

            res.status(200).json({status:200,success:true, message:`Yaxshi  delet qilindi`, data: KafedraYonalish})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

}

module.exports = new KafedraYonalishController;