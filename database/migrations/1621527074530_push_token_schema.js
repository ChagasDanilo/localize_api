'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PushTokenSchema extends Schema {
  up () {
    this.create('push_tokens', (table) => {
      table.increments()
      table.string('token').notNullable().unique()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.boolean('notifica').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('push_tokens')
  }
}

module.exports = PushTokenSchema
