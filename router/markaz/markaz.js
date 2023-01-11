const express = require('express')
const router = express.Router()
const MarkazController = require('../../controller/markaz/markaz');
const middleware = require('../../middleware')


router.post('/add', middleware.checkContentType, middleware.checkToken,  MarkazController.Add);
router.get('/all', middleware.checkContentType, MarkazController.Get)
router.get('/:id',  middleware.checkParamsId,  middleware.checkContentType,   MarkazController.GetById)
router.put('/:id', middleware.checkParamsId,  middleware.checkContentType, middleware.checkToken,  MarkazController.Edit)
router.delete('/:id', middleware.checkParamsId,  middleware.checkContentType, middleware.checkToken,  MarkazController.Delete)

module.exports = router
