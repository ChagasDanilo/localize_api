'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServicoSchema extends Schema {
  up () {
    this.create('servicos', (table) => {
      table.increments()
      table.integer('servico_categoria_id').unsigned().references('id').inTable('servico_categorias')
      table.string('descricao').notNullable()
      table.string('detalhes').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.decimal('valor', 18, 2)
      table.string('unidade_medida')
      table.decimal('estrelas', 18, 2).notNullable()
      table.string('palavra_chave')
      table.timestamps()
    })
  }

  down () {
    this.drop('servicos')
  }
}

module.exports = ServicoSchema
