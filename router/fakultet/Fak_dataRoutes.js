const express = require('express')
const router = express.Router()
const FakultetController = require('../../controller/fakultet/Fak_dataController')
const middleware = require('../../middleware')



router.post('/add', middleware.checkContentType, middleware.checkToken, FakultetController.Add)
router.get('/all', middleware.checkContentType,  FakultetController.Get)
router.get('/:id',middleware.checkParamsId, middleware.checkContentType, FakultetController.GetById)
router.put('/:id',middleware.checkParamsId,  middleware.checkContentType, middleware.checkToken, FakultetController.Edit)
router.delete('/:id',middleware.checkParamsId, middleware.checkContentType, middleware.checkToken, FakultetController.Delete)

module.exports = router
