'use strict'

const App = use('App/Models/ChatMensagem')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with chatmensagems
 */
class ChatMensagemController {
  /**
   * Show a list of all chatmensagems.
   * GET chatmensagems
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new chatmensagem.
   * GET chatmensagems/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new chatmensagem.
   * POST chatmensagems
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
  }

  /**
   * Display a single chatmensagem.
   * GET chatmensagems/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view, auth }) {
    try {
      const { cod } = request.get();

      const data = await App.query()
        .select('chat_mensagems.*', //'chats.*',
          'users_1.username as username_1', 'users_1.id as user_id_1',
          'users_2.username as username_2', 'users_2.id as user_id_2',
          'chat_mensagems.mensagem', 'chat_mensagems.user_id as user_id_enviou',
        )
        .joinRaw('left join chats on chats.id = chat_mensagems.chat_id')
        .joinRaw('left join users users_1 on users_1.id = chats.user_id_1')
        .joinRaw('left join users users_2 on users_2.id = chats.user_id_2')
        .where('chat_mensagems.chat_id', cod)
        .orderBy('chats.created_at')
        .fetch();

      return data
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Render a form to update an existing chatmensagem.
   * GET chatmensagems/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update chatmensagem details.
   * PUT or PATCH chatmensagems/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a chatmensagem with id.
   * DELETE chatmensagems/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = ChatMensagemController
