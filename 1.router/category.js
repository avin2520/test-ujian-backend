const Router = require('express').Router()
const controller = require('../2.controller/category')

Router.delete('/:id',controller.deleteCategoryById)


    


module.exports= Router