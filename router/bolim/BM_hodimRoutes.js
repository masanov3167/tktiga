const express = require('express')
const router = express.Router()
const multer = require('../../config/multer');
const middleware = require('../../middleware');
const BolimHodimController = require('../../controller/bolim/BM_hodimContoller')


router.post('/add', middleware.checkToken, multer.array('photo', 20), BolimHodimController.Add)
router.get('/all', middleware.checkContentType, middleware.checkToken, BolimHodimController.Get)
router.get('/:id', middleware.checkParamsId, middleware.checkContentType, BolimHodimController.GetById)
router.put('/:id',middleware.checkParamsId, middleware.checkToken, multer.array('photo', 20), BolimHodimController.Edit)
router.delete('/:id', middleware.checkParamsId, middleware.checkContentType,middleware.checkToken, BolimHodimController.Delete)

module.exports = router
