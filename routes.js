const express = require('express')
const route = express.Router()

const contatoController = require('./src/controllers/contatoController')
const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')

const {loginRequired} = require('./src/middlewares/middleware')

//HomePage
route.get('/', (req, res) => {res.redirect('/login/index')})


// Rotas de login
route.get('/login/index', loginController.index)
route.post('/login/register', loginController.register)
route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)

//rotas contato
route.get('/contato/index', loginRequired, contatoController.index)
route.post('/contato/registrar', loginRequired, contatoController.registrar)
route.get('/contato/index/:id',loginRequired, contatoController.editarIndex)
route.post('/contato/editar/:id', loginRequired, contatoController.editar)
route.get('/index',loginRequired, homeController.index)
route.get('/contato/deletar/:id', loginRequired, contatoController.deletar)


module.exports = route;
