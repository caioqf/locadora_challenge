import { faker } from "@faker-js/faker";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("general.model").del();

    // Inserts seed entries
    await knex("general.model").insert([
        {
            name: faker.vehicle.model(),
            FK_manufacturers: 1
        },
        {
            name: faker.vehicle.model(),
            FK_manufacturers: 1
        },
        {
            name: faker.vehicle.model(),
            FK_manufacturers: 3
        },
        {
            name: faker.vehicle.model(),
            FK_manufacturers: 2
        },
        {
            name: faker.vehicle.model(),
            FK_manufacturers: 3
        },
        {
            name: faker.vehicle.model(),
            FK_manufacturers: 4
        },

    ]);

};
