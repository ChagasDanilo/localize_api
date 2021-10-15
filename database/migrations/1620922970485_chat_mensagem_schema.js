'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChatMensagemSchema extends Schema {
  up () {
    this.create('chat_mensagems', (table) => {
      table.increments()
      table.integer('chat_id').unsigned().references('id').inTable('chats')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('mensagem').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('chat_mensagems')
  }
}

module.exports = ChatMensagemSchema
