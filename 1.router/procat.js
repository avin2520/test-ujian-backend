const Router = require('express').Router()
const controller = require('../2.controller/procat')


Router.get('/',controller.getDataJoin)
Router.post('/',controller.postProcat)



module.exports= Router