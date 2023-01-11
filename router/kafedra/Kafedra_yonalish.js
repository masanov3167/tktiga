const express = require('express')
const KafedraYonalishController = require('../../controller/kafedra/Kafedra_yonalish')
const router = express.Router()
const middlewares = require('../../middleware')

router.post('/add', middlewares.checkContentType, middlewares.checkToken, KafedraYonalishController.Add)
router.get('/all', middlewares.checkContentType, middlewares.checkToken, KafedraYonalishController.Get)
router.get('/:id', middlewares.checkParamsId, middlewares.checkContentType, middlewares.checkToken, KafedraYonalishController.GetById)
router.put('/:id', middlewares.checkParamsId, middlewares.checkContentType, middlewares.checkToken, KafedraYonalishController.Edit)
router.delete('/:id', middlewares.checkParamsId,  middlewares.checkContentType, middlewares.checkToken, KafedraYonalishController.Delete)

module.exports = router