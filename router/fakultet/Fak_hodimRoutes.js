const express = require('express')
const router = express.Router()
const multer = require('../../config/multer')
const FakultetHodimController = require('../../controller/fakultet/Fak_HodemController')
const middleware = require('../../middleware')


router.post('/add', middleware.checkToken, multer.array('photo', 20), FakultetHodimController.Add)
router.get('/all', middleware.checkContentType, middleware.checkToken, FakultetHodimController.Get)
router.get('/:id',middleware.checkParamsId, middleware.checkContentType, FakultetHodimController.GetById)
router.put('/:id',middleware.checkParamsId,  middleware.checkToken, multer.array('photo', 20), FakultetHodimController.Edit)
router.delete('/:id',middleware.checkParamsId, middleware.checkContentType, middleware.checkToken, FakultetHodimController.Delete)

module.exports = router
