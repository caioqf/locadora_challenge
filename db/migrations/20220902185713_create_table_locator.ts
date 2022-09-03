import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists('general.locator', (table) => {
    table.increments('id').primary();
    table.string('trade_name', 50).notNullable();
    table.string('corporate_name', 50).notNullable();
    table.string('cnpj', 14).unique().notNullable();
    table.string('email', 50).notNullable();
    table.string('telephone', 11);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('general.locator');
}
