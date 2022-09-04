import { faker } from "@faker-js/faker";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("general.manufacturers").del();


    // Inserts seed entries
    await knex("general.manufacturers").insert([
        { name: faker.helpers.unique(faker.vehicle.manufacturer) },
        { name: faker.helpers.unique(faker.vehicle.manufacturer) },
        { name: faker.helpers.unique(faker.vehicle.manufacturer) },
        { name: faker.helpers.unique(faker.vehicle.manufacturer) },
    ]);
};
