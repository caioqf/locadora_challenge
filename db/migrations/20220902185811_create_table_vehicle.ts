import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists('general.vehicle', (table) => {
    table.increments('veic_id').primary();
    table.integer('veic_doors_number').notNullable();
    table.string('veic_color', 10);
    table.integer('veic_model_year');
    table.integer('veic_year_fabrication');
    table.string('veic_plate', 10).unique().notNullable();
    table.string('veic_chassis', 20).unique().notNullable();
    table.date('veic_date_creation');
    table.jsonb('veic_log');
    table
      .bigInteger('FK_veiculo_montadora')
      .references('mont_id')
      .inTable('general.manufacturers')
      .notNullable();
    table
      .bigInteger('FK_vehicle_model')
      .references('model_id')
      .inTable('general.model')
      .notNullable();
    table
      .bigInteger('FK_vehicle_locator')
      .references('model_id')
      .inTable('general.model')
      .notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('general.vehicle');
}
