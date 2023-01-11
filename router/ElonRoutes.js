const express = require('express')
const router = express.Router()
const multer = require('../config/multer')
const middleware = require('../middleware');
const ElonController = require('../controller/elon')


router.post('/add', middleware.checkToken, multer.array('photo', 20), ElonController.Add)
router.get('/all', middleware.checkContentType, ElonController.Get)
router.get('/:id', middleware.checkParamsId, middleware.checkContentType, ElonController.GetById)
router.put('/:id', middleware.checkParamsId, middleware.checkToken, multer.array('photo', 20), ElonController.Edit)
router.delete('/:id', middleware.checkParamsId, middleware.checkContentType, middleware.checkToken, ElonController.Delete)

module.exports = router