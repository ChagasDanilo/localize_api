'use strict'

const App = use('App/Models/Servico')
const AppImg = use('App/Models/ServicoImagem')
const Helpers = use('Helpers')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with servicos
 */
class ServicoController {
  /**
   * Show a list of all servicos.
   * GET servicos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    try {
      const { cod } = request.get();

      const data = await App.query()
        .select('servicos.*')
        // .join('servico_categorias', 'servico_categorias.id', 'servicos.servico_categoria_id')
        .where('servicos.id', cod)
        .fetch();

      return data
    } catch (error) {
      console.log(error.message);
      return response.status(500).send({ error: 'Error: ' + error.message })
    }
  }

  /**
   * Render a form to be used for creating a new servico.
   * GET servicos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new servico.
   * POST servicos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    try {
      const data = request.only([, "servico_categoria_id", "descricao", "detalhes", "valor",
        "unidade_medida", "palavra_chave",])
      data.user_id = auth.user.id
      data.estrelas = 0

      const file = request.file('imagens', {})

      const add = await App.create({ ...data })
      console.log(add);

      var imgPath = []
      await file.moveAll(Helpers.publicPath('arquivos/servicos'), (param) => {
        imgPath.push(param.clientName)
      })
      if (!file.movedAll()) {
        console.log(file.errors())
      }
      for (let i = 0; i < imgPath.length; i++) {
        const img = []
        img.servico_id = add.id
        img.path = imgPath[i]
        await AppImg.create({ ...img });
      }

      return add
    } catch (err) {
      return err
    }
  }

  /**
   * Display a single servico.
   * GET servicos/:id
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
   * Render a form to update an existing servico.
   * GET servicos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update servico details.
   * PUT or PATCH servicos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const { id, servico_categoria_id, descricao, valor, unidade_medida, estrelas, palavra_chave, detalhes } = request.all()

      const data = await App.query()
        .where('id', id)
        .first();

      if (!data) {
        return response.status(404).send({ message: 'Nenhum registro localizado' })
      }

      data.servico_categoria_id = servico_categoria_id
      data.descricao = descricao
      data.detalhes = detalhes
      data.valor = valor
      data.unidade_medida = unidade_medida
      data.estrelas = estrelas
      data.palavra_chave = palavra_chave

      await data.save()

      return data
    } catch (err) {
      return err
    }
  }

  /**
   * Delete a servico with id.
   * DELETE servicos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const { cod } = request.get();
    try {
      const data = await App.query()
        .where('id', cod)
        .first()

      if (!data) {
        return response.status(404).send({ message: 'Nenhum registro localizado' })
      }

      await data.delete()
      return response.status(200).send({ message: 'registro removido!' })
    } catch (err) {
      console.log(err);
    }
  }

  async like({ params, request, response, view }) {
    try {
      const { texto } = request.get();

      const data = await App.query()
        .select('servicos.*')
        .join('servico_categorias', 'servico_categorias.id', 'servicos.servico_categoria_id')
        .whereRaw('upper(servicos.palavra_chave) like ? '
          + ' or upper(servicos.descricao) like ? '
          + ' or upper(servico_categorias.descricao) like ?',
          ['%' + texto.toUpperCase() + '%', '%' + texto.toUpperCase() + '%', '%' + texto.toUpperCase() + '%'])
        .fetch();

      return data
    } catch (error) {
      console.log(error.message);
      return response.status(500).send({ error: 'Error: ' + error.message })
    }
  }
}

module.exports = ServicoController
