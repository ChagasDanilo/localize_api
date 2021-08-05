'use strict'

const App = use('App/Models/PushToken')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pushtokens
 */
class PushTokenController {
  /**
   * Show a list of all pushtokens.
   * GET pushtokens
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new pushtoken.
   * GET pushtokens/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new pushtoken.
   * POST pushtokens
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try{
      const data = request.only(["token","notifica"])

      const add = await App.create({...data})

      return add
    }catch(err){
      return this.update({request, response})
      //return err;
    }    
  }

  /**
   * Display a single pushtoken.
   * GET pushtokens/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const data = await App.all();

    if (!data) {
      return response.status(404).send({message: 'Nenhum registro localizado!'})
    }
    return data   
  }

  /**
   * Render a form to update an existing pushtoken.
   * GET pushtokens/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update pushtoken details.
   * PUT or PATCH pushtokens/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try{
      const dados = request.only(["token","notifica"])

      const data = await App.query()
      .where('token', dados.token)
      .first();

      if (!data) {
        return response.status(404).send({message: 'Nenhum registro localizado'})
      }

      data.notifica = dados.notifica;

      await data.save()

      return data    
    }catch(err){
      console.log(err);
      return err;      
    }
  }

  async updateUserId ({ params, request, response, auth }) {
    try{
      const dados = request.only(["token","notifica"])

      const data = await App.query()
      .where('token', dados.token)
      .first();

      if (!data) {
        const add = await App.create({...dados})
        return add //response.status(404).send({message: 'Nenhum registro localizado'})
      }

      data.notifica = dados.notifica;
      data.user_id = auth.user.id;

      await data.save()

      return data    
    }catch(err){
      console.log(err);
      return err;      
    }    
  }

  /**
   * Delete a pushtoken with id.
   * DELETE pushtokens/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const { token } = request.get();
    
    const data = await App.query()
      .where('token', token)
      .first()

    if (!data) {
      return response.status(404).send({message: 'Nenhum registro localizado'})
    }
    
    await data.delete()
    return response.status(200).send({ message: 'registro removido!' })
  }

  async pushSend ({ request, response, auth }) {
    const notific = request.only(["titulo","conteudo"])
    const data = await App.query()
    .where('notifica', true)
    .fetch();

    if (!data) {
      return response.status(404).send({message: 'Nenhum registro localizado!'})
    }

    // await this.gravaNotificacao(null, notific.titulo, notific.conteudo, auth, false, null, null);
    for (let i = 0; i < data.rows.length; i++) {
      await this.sendPushNotification( notific.titulo, notific.conteudo, data.rows[i].token);
    }
    return data       
  }

  async pushSendUserId ({ request, response, auth }) {
    const notific = request.only(["titulo","conteudo","user_id"])
    const data = await App.query()
    .where('user_id', notific.user_id)
    .where('notifica', true)
    .fetch();

    if (!data) {
      return response.status(404).send({message: 'Nenhum registro localizado!'})
    }

    // await this.gravaNotificacao(null, notific.titulo, notific.conteudo, auth, false, null, null);
    for (let i = 0; i < data.rows.length; i++) {
      await this.sendPushNotification( notific.titulo, notific.conteudo, data.rows[i].token);
    }
    return data       
  }

  async sendPushNotification( _title, _body, _token ){
    const { Expo } = require("expo-server-sdk");
    const expo = new Expo();

    let notifications = [];      
    if (!Expo.isExpoPushToken(_token)) {
      console.error(`Push token ${_token} is not a valid Expo push token`);
      return `Push token ${_token} is not a valid Expo push token`;
    }

    notifications.push({
      to: _token,
      sound: "default",
      title: _title,
      body: _body,
      data: { _body }
    });

    let chunks = expo.chunkPushNotifications(notifications);
    (async () => {
      for (let chunk of chunks) {
        try {
          let receipts = await expo.sendPushNotificationsAsync(chunk);
          console.log(receipts);
        } catch (error) {
          console.error(error);
        }
      }
    })();    
  };
}

module.exports = PushTokenController
