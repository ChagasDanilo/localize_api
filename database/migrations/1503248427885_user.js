'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('telefone1', 20)
      table.string('telefone2', 20)
      table.string('instagram')
      table.string('facebook')
      table.string('path')
      table.string('cep')
      table.string('pais').default('Brasil')
      table.string('estado')
      table.string('cidade')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
