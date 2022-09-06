import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createSchemaIfNotExists('general');
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropSchemaIfExists('general');
}
