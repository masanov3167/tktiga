const express = require('express')
const router = express.Router()
const multer = require('../config/multer')
const middleware = require('../middleware');
const NewsController = require('../controller/news')




router.post('/add', middleware.checkToken, multer.array('photo', 20), NewsController.Add)
router.get('/all', middleware.checkContentType, NewsController.Get)
router.get('/:id', middleware.checkParamsId, middleware.checkContentType, NewsController.GetById)
router.put('/:id', middleware.checkParamsId, middleware.checkToken, multer.array('photo', 20), NewsController.Edit)
router.delete('/:id', middleware.checkParamsId, middleware.checkContentType, middleware.checkToken, NewsController.Delete)

module.exports = router