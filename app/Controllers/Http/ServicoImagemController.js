'use strict'

const App = use('App/Models/ServicoImagem')
const Helpers = use('Helpers')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with servicoimagems
 */
class ServicoImagemController {
  /**
   * Show a list of all servicoimagems.
   * GET servicoimagems
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const { cod } = request.get();

    const data = await App.query()
      .where('servico_id', cod)
      .orderBy('id')
      .fetch();

    console.log(data.rows);
    return data
  }

  async indexFirst({ request, response, view }) {
    try {
      const { cod } = request.get();

      const data = await App.query()
        .select('path')
        .where('servico_id', cod)
        .orderBy('id')
        .limit(1)
        .fetch();

      console.log(data.rows[0].path);

      return response.download(Helpers.publicPath(`arquivos/servicos/` + data.rows[0].path));

    } catch (error) {
      console.log(error);
      return response.status(500).send({ error: error })
    }
  }

  async indexImage({ request, response, view }) {
    try {
      const { fileName } = request.get();

      // send image raw
      return response.download(Helpers.publicPath(`arquivos/servicos/` + fileName));

    } catch (error) {
      console.log(error);
      return response.status(500).send({ error: error })
    }
  }

  /**
   * Render a form to be used for creating a new servicoimagem.
   * GET servicoimagems/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new servicoimagem.
   * POST servicoimagems
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
  }

  /**
   * Display a single servicoimagem.
   * GET servicoimagems/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const data = await App.all();

    return data
  }

  /**
   * Render a form to update an existing servicoimagem.
   * GET servicoimagems/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update servicoimagem details.
   * PUT or PATCH servicoimagems/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a servicoimagem with id.
   * DELETE servicoimagems/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = ServicoImagemController
