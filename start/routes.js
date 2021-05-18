'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Route.on('/').render('welcome')

Route.post('/servicoCategoriaStore', 'ServicoCategoriaController.store').middleware('auth')
Route.get('/servicoCategoriaShow', 'ServicoCategoriaController.show')
Route.post('/servicoCategoriaUpdate', 'ServicoCategoriaController.update').middleware('auth')
Route.delete('/servicoCategoriaDestroy', 'ServicoCategoriaController.destroy').middleware('auth')

Route.post('/servicoStore', 'ServicoController.store')//.middleware('auth')
Route.get('/servicoShow', 'ServicoController.show')
Route.get('/servicoLike', 'ServicoController.like')
Route.post('/servicoUpdate', 'ServicoController.update').middleware('auth')
Route.delete('/servicoDestroy', 'ServicoController.destroy').middleware('auth')

Route.post('/vagaEmpregoStore', 'VagaEmpregoController.store').middleware('auth')
Route.get('/vagaEmpregoShow', 'VagaEmpregoController.show')
Route.get('/vagaEmpregoLike', 'VagaEmpregoController.like')
Route.delete('/vagaEmpregoDestroy', 'VagaEmpregoController.destroy').middleware('auth')

Route.post('/chatStore', 'ChatController.store').middleware('auth')
Route.get('/chatShow', 'ChatController.show').middleware('auth')

Route.post('/userCreate', 'UserController.create')//.middleware('auth')
Route.post('/login', 'UserController.login')
Route.get('/loginCheck', 'UserController.loginCheck').middleware('auth')
Route.get('/userId', 'UserController.index').middleware('auth')
Route.get('/listUser', 'UserController.show').middleware('auth')
Route.get('/temEmailCad', 'UserController.temEmailCad')
Route.post('/userUpdate', 'UserController.update').middleware('auth')
Route.delete('/userDelete', 'UserController.destroy').middleware('auth')
Route.post('/resetPassword', 'UserController.resetPassword').middleware('auth')
Route.post('/resetPasswordEmail', 'UserController.resetPasswordEmail').middleware('auth')