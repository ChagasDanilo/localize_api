'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServicoCategoriaSchema extends Schema {
  up () {
    this.create('servico_categorias', (table) => {
      table.increments()
      table.string('descricao').notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('servico_categorias')
  }
}

module.exports = ServicoCategoriaSchema
