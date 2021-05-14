'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChatSchema extends Schema {
  up () {
    this.create('chats', (table) => {
      table.increments()
      table.integer('user_id_remetente').unsigned().references('id').inTable('users')
      table.integer('user_id_destinatario').unsigned().references('id').inTable('users')
      table.string('mensagem').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('chats')
  }
}

module.exports = ChatSchema
