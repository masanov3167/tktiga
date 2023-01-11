const express = require('express')
const router = express.Router()
const multer = require('../config/multer')
const { addDaraja, getById, getAll, updatedaraja, deletedaraja, getQuery, downloadDaraja } = require('../controller/darajaController')



router.post('/add', multer.array('photo', 20), addDaraja)
router.get('/all', getAll)
router.get("/query", getQuery)
router.get('/:id', getById)
router.get('/download/:id', downloadDaraja)
router.put('/:id', multer.array('photo', 20), updatedaraja)
router.delete('/:id', deletedaraja)

module.exports = router
