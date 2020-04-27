const Router = require('express').Router()
const controller = require('../2.controller/product')

Router.get('/',controller.getDataProducts)
Router.post('/',controller.addNewProduct)
Router.patch('/:id',controller.editDataProduct)
Router.delete('/:id',controller.deleteMovieById)


    


module.exports= Router