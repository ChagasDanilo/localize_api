'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with vagaempregos
 */
class VagaEmpregoController {
  /**
   * Show a list of all vagaempregos.
   * GET vagaempregos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new vagaemprego.
   * GET vagaempregos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new vagaemprego.
   * POST vagaempregos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const data = request.only([,"vaga", "empresa", "vinculo", "valor", "detalhes", "procurar"])
    data.user_id = auth.user.id

    const add = await App.create({...data})

    return add
  }

  /**
   * Display a single vagaemprego.
   * GET vagaempregos/:id
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
   * Render a form to update an existing vagaemprego.
   * GET vagaempregos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update vagaemprego details.
   * PUT or PATCH vagaempregos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a vagaemprego with id.
   * DELETE vagaempregos/:id
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

module.exports = VagaEmpregoController
