'use strict'

const App = use('App/Models/Chat')
const AppMensagem = use('App/Models/ChatMensagem')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with chats
 */
class ChatController {
  /**
   * Show a list of all chats.
   * GET chats
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view, auth }) {
    try {
      const { cod } = request.get();

      console.log(auth.user.id);
      console.log(cod);
      const data = await App.query()
        .select('*')
        .whereRaw('(user_id_1 = ' + auth.user.id
          + ' and user_id_2 = ' + cod
          + ') or (user_id_1 = ' + cod
          + ' and user_id_2 = ' + auth.user.id
          + ')')
        .limit(1)
        .fetch();

        console.log(data.rows);

      return data
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Render a form to be used for creating a new chat.
   * GET chats/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new chat.
   * POST chats
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    try {
      const dataRequisicao = request.only([, "chat_id", "user_id_destinatario", "mensagem"])

      let data = []
      let dataMensagem = []

      data.user_id_1 = auth.user.id
      data.user_id_2 = dataRequisicao.user_id_destinatario

      console.log(dataRequisicao.chat_id);
      if (dataRequisicao.chat_id <= 0) {
        const add = await App.create({ ...data })
        dataMensagem.chat_id = add.id
        console.log(add);
      } else {
        dataMensagem.chat_id = dataRequisicao.chat_id
      }

      dataMensagem.user_id = auth.user.id
      dataMensagem.mensagem = dataRequisicao.mensagem
      const addMensagem = await AppMensagem.create({ ...dataMensagem })

      // console.log(addMensagem);
      return addMensagem
    } catch (err) {
      console.log(err);
      return err
    }
  }

  /**
   * Display a single chat.
   * GET chats/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view, auth }) {
    try {
      const data = await App.query()
        .select('chats.*',
          'users_1.username as username_1', 'users_1.id as user_id_1',
          'users_2.username as username_2', 'users_2.id as user_id_2',
        )
        .joinRaw('left join users users_1 on users_1.id = chats.user_id_1')
        .joinRaw('left join users users_2 on users_2.id = chats.user_id_2')
        .whereRaw('user_id_1 = ' + auth.user.id
          + ' or user_id_2 = ' + auth.user.id)
        .orderBy('chats.created_at')
        .fetch();

      return data
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Render a form to update an existing chat.
   * GET chats/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update chat details.
   * PUT or PATCH chats/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a chat with id.
   * DELETE chats/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = ChatController
