const express = require('express')
const router = express.Router()
const multer = require('../../config/multer')
const Kafedra_hodimController = require('../../controller/kafedra/Kafedra_hodimController')
const middleware = require('../../middleware')



router.post('/add', middleware.checkToken, multer.array('photo', 20), Kafedra_hodimController.Add)
router.get('/all', middleware.checkContentType, middleware.checkToken, Kafedra_hodimController.Get)
router.get('/:id',middleware.checkParamsId, middleware.checkContentType, Kafedra_hodimController.GetById)
router.put('/:id', middleware.checkParamsId, middleware.checkToken,  multer.array('photo', 20), Kafedra_hodimController.Edit)
router.delete('/:id', middleware.checkContentType, middleware.checkParamsId, middleware.checkToken, Kafedra_hodimController.Delete)

module.exports = router
