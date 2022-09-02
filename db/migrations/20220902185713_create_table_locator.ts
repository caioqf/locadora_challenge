import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists('general.locator', (table) => {
    table.increments('loc_id').primary();
    table.string('loc_trade_name', 50).notNullable();
    table.string('loc_corporate_name', 50).notNullable();
    table.string('loc_cnpj', 14).unique().notNullable();
    table.string('loc_email', 50).notNullable();
    table.string('loc_telephone', 11);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('general.locator');
}
