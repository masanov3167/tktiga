const express = require('express')
const router = express.Router()
const BolimController = require('../../controller/bolim/BM_dataController');
const middleware = require('../../middleware')


router.post('/add', middleware.checkContentType, middleware.checkToken,  BolimController.Add);
router.get('/all', middleware.checkContentType, BolimController.Get)
router.get('/:id',  middleware.checkParamsId,  middleware.checkContentType,   BolimController.GetById)
router.put('/:id', middleware.checkParamsId,  middleware.checkContentType, middleware.checkToken,  BolimController.Edit)
router.delete('/:id', middleware.checkParamsId,  middleware.checkContentType, middleware.checkToken,  BolimController.Delete)

module.exports = router
