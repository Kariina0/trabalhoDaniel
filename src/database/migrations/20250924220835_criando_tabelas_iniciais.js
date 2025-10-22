/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  const hasMarcas = await knex.schema.hasTable('marcas')
  if (!hasMarcas) {
    return knex.schema.createTable('marcas', (table) => {
      table.increments('id').primary()
      table.string('nome', 100).notNullable()
      table.string('site', 100)
      table.string('telefone', 15)
    })
  }
  // No-op if table already exists (idempotent)
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  const hasMarcas = await knex.schema.hasTable('marcas')
  if (hasMarcas) {
    return knex.schema.dropTable('marcas')
  }
  // No-op if table does not exist
}
