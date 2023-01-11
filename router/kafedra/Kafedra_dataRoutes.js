const express = require('express')
const Kafedra_dataController = require('../../controller/kafedra/Kafedra_dataController')
const router = express.Router()
const middlewares = require('../../middleware')
router.post('/add', middlewares.checkContentType, middlewares.checkToken, Kafedra_dataController.Add)
router.get('/all', middlewares.checkContentType, Kafedra_dataController.Get)
router.get('/:id', middlewares.checkParamsId, middlewares.checkContentType, Kafedra_dataController.GetById)
router.put('/:id', middlewares.checkParamsId, middlewares.checkContentType, middlewares.checkToken, Kafedra_dataController.Edit)
router.delete('/:id', middlewares.checkParamsId,  middlewares.checkContentType, middlewares.checkToken, Kafedra_dataController.Delete)

module.exports = router
