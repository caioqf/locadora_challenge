import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists('general.vehicle_locator', (table) => {
    table.increments('log_id').primary()
    table.bigInteger('FK_vehicle')
      .references('id')
      .inTable('general.vehicle')
    table
      .bigInteger('FK_vehicle_locator')
      .references('id')
      .inTable('general.locator')
    table.timestamp('register_date').notNullable()
    table.timestamp('transefer_date').nullable()
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('general.vehicle_locator')
}

