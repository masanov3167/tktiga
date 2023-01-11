const Sertifikat = require('../models/sertifikat')

exports.addSertifikat = async (req, res) => {
    const rasmla = req.files
    let photos = []
    rasmla.forEach(photo => photos.push(`uploads/${photo.filename}`))
    try {
        const result = new Sertifikat({
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
        const result = await Sertifikat.findById({ _id: req.params.id })
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
        const result = await Sertifikat.find({}).sort({ date: -1 })
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

exports.updateSertifikat = async (req, res) => {
    const rasmla = req.files
    let photos = []
    rasmla.forEach(photo => photos.push(`uploads/${photo.filename}`))
    try {
        const result = await Sertifikat.findByIdAndUpdate(req.params.id, {
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

exports.deleteSertifikat = async (req, res) => {
    try {
        await Sertifikat.findByIdAndDelete({ _id: req.params.id })
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
