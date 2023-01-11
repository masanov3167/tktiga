const express = require('express')
const router = express.Router()
const multer = require('../config/multer')

const { addSertifikat, getById, getAll, updateSertifikat, deleteSertifikat } = require('../controller/sertifikatController')



router.post('/add', multer.array('photo', 20), addSertifikat)
router.get('/all', getAll)
router.get('/:id', getById)
router.put('/:id', multer.array('photo', 20), updateSertifikat)
router.delete('/:id', deleteSertifikat)

module.exports = router
