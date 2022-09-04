import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists('general.vehicle', (table) => {
    table.increments('id').primary();
    table.integer('doors_number').notNullable();
    table.string('color', 10);
    table.integer('year');
    table.integer('year_fabrication');
    table.string('plate', 10).unique().notNullable();
    table.string('chassis', 20).unique().notNullable();
    table.date('date_creation');
    table.jsonb('log');
    table.jsonb('locators_history')
    table
      .bigInteger('FK_veiculo_montadora')
      .references('id')
      .inTable('general.manufacturers')
      .notNullable();
    table
      .bigInteger('FK_vehicle_model')
      .references('id')
      .inTable('general.model')
      .notNullable();
    table
      .bigInteger('FK_vehicle_locator')
      .references('id')
      .inTable('general.model')
      .notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('general.vehicle');
}
