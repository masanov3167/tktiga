const express = require('express')
const router = express.Router()
const multer = require('../../config/multer');
const middleware = require('../../middleware');
const MarkazHodimController = require('../../controller/markaz/markaz_hodim')


router.post('/add', middleware.checkToken, multer.array('photo', 20), MarkazHodimController.Add)
router.get('/all', middleware.checkContentType, middleware.checkToken, MarkazHodimController.Get)
router.get('/:id', middleware.checkParamsId, middleware.checkContentType, MarkazHodimController.GetById)
router.put('/:id',middleware.checkParamsId, middleware.checkToken, multer.array('photo', 20), MarkazHodimController.Edit)
router.delete('/:id', middleware.checkParamsId, middleware.checkContentType,middleware.checkToken, MarkazHodimController.Delete)

module.exports = router
