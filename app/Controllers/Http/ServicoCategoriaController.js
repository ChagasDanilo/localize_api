'use strict'

const App = use('App/Models/ServicoCategoria')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with servicocategorias
 */
class ServicoCategoriaController {
  /**
   * Show a list of all servicocategorias.
   * GET servicocategorias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new servicocategoria.
   * GET servicocategorias/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new servicocategoria.
   * POST servicocategorias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only([,"descricao",])

    const add = await App.create({...data})

    return add
  }

  /**
   * Display a single servicocategoria.
   * GET servicocategorias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const data = await App.all();

    return data
  }

  /**
   * Render a form to update an existing servicocategoria.
   * GET servicocategorias/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update servicocategoria details.
   * PUT or PATCH servicocategorias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try{
      const { id, descricao } = request.all()
  
      const data = await App.query()
      .where('id', id)
      .first();
  
      if (!data) {
        return response.status(404).send({message: 'Nenhum registro localizado'})
      }
  
      data.descricao = descricao;
  
      await data.save()
  
      return data
    }catch(err){
        return err
    }
  }

  /**
   * Delete a servicocategoria with id.
   * DELETE servicocategorias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const { cod } = request.get();
    try{
        const data = await App.query()
        .where('id', cod)
        .first()
    
        if (!data) {
        return response.status(404).send({message: 'Nenhum registro localizado'})
        }
        
        await data.delete()
        return response.status(200).send({ message: 'registro removido!' })    
    }catch(err){
        console.log(err);            
    }
  }
}

module.exports = ServicoCategoriaController
