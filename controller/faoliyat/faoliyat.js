const Faoliyat_Data = require('../../models/Faoliyat/faoliyat')

exports.addFaoliyat_Data = async (req, res) => {
    const rasmla = req.files
    let photos = []
    rasmla.forEach(photo => photos.push(`uploads/${photo.filename}`))
    try {
        const result = new Faoliyat_Data({
            ...req.body,
            photo: photos
        })       
        await result.save()
        res.status(201).json(
            {
                success: true,
                status: 201,
                data: result
            }
        )
    } catch (e) {
        res.status(500).json(
            {
                success: false,
                err: "error"
            }
        )
    }
}

exports.getById = async (req, res) => {
    try {
        const result = await Faoliyat_Data.findById({ _id: req.params.id })
        res.status(200).json(
            {
                success: true,
                status: 200,
                data: result
            }
        )
    } catch (e) {
        res.status(404).json(
            {
                message: "result not found"
            }
        )
    }
}

exports.getAll = async (req, res) => {
    try {
        const result = await Faoliyat_Data.find({}).sort({ date: -1 })
        res.status(200).json(
            {
                success: true,
                status: 200,
                data: result
            }
        )
    } catch (e) {
        res.status(404).json(
            {
                message: "result not found"
            }
        )
    }
}

exports.updateFaoliyat = async (req, res) => {
    const rasmla = req.files
    let photos = []
    rasmla.forEach(photo => photos.push(`uploads/${photo.filename}`))
    try {
        const result = await Faoliyat_Data.findByIdAndUpdate(req.params.id, {
            ...req.body,
            photo: photos
        })
        res.status(200).json(
            {
                success: true,
                status: 200,
                data: result
            }
        )
    } catch (e) {
        res.status(404).json(
            {
                message: "result not found"
            }
        )
    }
}

exports.deleteFaoliyat = async (req, res) => {
    try {
        await Faoliyat_Data.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json(
            {
                success: true,
                status: 200,
                data: []
            }
        )
    } catch (e) {
        res.status(404).json(
            {
                message: "result not found"
            }
        )
    }
}
