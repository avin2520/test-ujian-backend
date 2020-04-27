const Router = require('express').Router()
const controller = require('../2.controller/category')

Router.delete('/:id',controller.deleteCategoryById)
Router.get('/',controller.getAllData)
Router.patch('/:id',controller.EditCategoryById)
Router.post('/',controller.addCategoryById)

    


module.exports= Router