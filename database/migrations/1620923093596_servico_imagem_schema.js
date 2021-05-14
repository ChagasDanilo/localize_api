'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServicoImagemSchema extends Schema {
  up () {
    this.create('servico_imagems', (table) => {
      table.increments()
      table.integer('servico_id').unsigned().references('id').inTable('servicos')
      table.string('path')
      table.timestamps()
    })
  }

  down () {
    this.drop('servico_imagems')
  }
}

module.exports = ServicoImagemSchema
