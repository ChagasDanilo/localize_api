'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VagaEmpregoSchema extends Schema {
  up () {
    this.create('vaga_empregos', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('vaga').notNullable()
      table.string('empresa').notNullable()
      table.string('vinculo')
      table.decimal('valor', 18, 2)
      table.string('detalhes').notNullable()
      table.string('procurar').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('vaga_empregos')
  }
}

module.exports = VagaEmpregoSchema
