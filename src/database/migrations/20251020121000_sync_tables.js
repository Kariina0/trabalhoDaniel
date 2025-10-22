/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  const hasMarcas = await knex.schema.hasTable('marcas')
  if (hasMarcas) {
    const hasMongo = await knex.schema.hasColumn('marcas', 'mongo_id')
    await knex.schema.alterTable('marcas', (table) => {
      if (!hasMongo) table.string('mongo_id', 24).unique().index()
      table.timestamps(true, true)
    })
  } else {
    await knex.schema.createTable('marcas', (table) => {
      table.increments('id').primary()
      table.string('mongo_id', 24).unique().index()
      table.string('nome', 100).notNullable()
      table.string('site', 100)
      table.string('telefone', 15)
      table.timestamps(true, true)
    })
  }

  const hasProdutos = await knex.schema.hasTable('produtos')
  if (!hasProdutos) {
    await knex.schema.createTable('produtos', (table) => {
      table.increments('id').primary()
      table.string('mongo_id', 24).unique().index()
      table.string('nome', 150).notNullable()
      table.decimal('preco', 10, 2).notNullable()
      table.integer('estoque').notNullable()
      table.string('marca_mongo_id', 24).index()
      table.timestamps(true, true)
    })
  }

  const hasPedidos = await knex.schema.hasTable('pedidos')
  if (!hasPedidos) {
    await knex.schema.createTable('pedidos', (table) => {
      table.increments('id').primary()
      table.string('mongo_id', 24).unique().index()
      table.string('numero', 50).notNullable().index()
      table.string('cliente_nome', 150).notNullable()
      table.decimal('total', 12, 2).notNullable()
      table.string('status', 20).notNullable()
      table.json('itens_json').notNullable()
      table.timestamps(true, true)
    })
  }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  if (await knex.schema.hasTable('pedidos')) await knex.schema.dropTable('pedidos')
  if (await knex.schema.hasTable('produtos')) await knex.schema.dropTable('produtos')
  if (await knex.schema.hasTable('marcas')) {
    const hasMongo = await knex.schema.hasColumn('marcas', 'mongo_id')
    if (hasMongo) {
      await knex.schema.alterTable('marcas', (table) => {
        table.dropColumn('mongo_id')
      })
    }
  }
}
