import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists('general.model', (table) => {
    table.increments('id').primary();
    table.string('name', 50).notNullable();
    table
      .bigInteger('FK_manufacturers')
      .references('id')
      .inTable('general.manufacturers')
      .notNullable();
    table.unique(['name', 'FK_manufacturers'])
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('general.model');
}
