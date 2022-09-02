import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists('general.model', (table) => {
    table.increments('model_id').primary();
    table.string('model_name', 50).unique().notNullable();
    table
      .bigInteger('FK_model_manufacturers')
      .references('mont_id')
      .inTable('general.manufacturers')
      .notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('general.model');
}
