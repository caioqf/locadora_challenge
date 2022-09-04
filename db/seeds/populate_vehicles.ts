import { faker } from "@faker-js/faker";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("general.vehicle").del();

    // Inserts seed entries
    await knex("general.vehicle").insert([
        {
            doors_number: faker.datatype.number({ min: 2, max: 4 }),
            color: faker.color.human(),
            year_model: "2015",
            year_fabrication: "2019",
            date_creation: faker.date.past(1),
            plate: faker.vehicle.vrm(),
            chassis: faker.helpers.unique(faker.vehicle.vin),
            FK_vehicle_model: faker.datatype.number({ min: 1, max: 6 }),
            FK_vehicle_manufacturers: faker.datatype.number({ min: 1, max: 4 }),
            FK_vehicle_locator: faker.datatype.number({ min: 1, max: 5 })
        },
        {
            doors_number: faker.datatype.number({ min: 2, max: 4 }),
            color: faker.color.human(),
            year_model: "2015",
            year_fabrication: "2019",
            date_creation: faker.date.past(1),
            plate: faker.vehicle.vrm(),
            chassis: faker.helpers.unique(faker.vehicle.vin),
            FK_vehicle_model: faker.datatype.number({ min: 1, max: 6 }),
            FK_vehicle_manufacturers: faker.datatype.number({ min: 1, max: 4 }),
            FK_vehicle_locator: faker.datatype.number({ min: 1, max: 5 })
        },
        {
            doors_number: faker.datatype.number({ min: 2, max: 4 }),
            color: faker.color.human(),
            year_model: "2015",
            year_fabrication: "2019",
            date_creation: faker.date.past(1),
            plate: faker.vehicle.vrm(),
            chassis: faker.helpers.unique(faker.vehicle.vin),
            FK_vehicle_model: faker.datatype.number({ min: 1, max: 6 }),
            FK_vehicle_manufacturers: faker.datatype.number({ min: 1, max: 4 }),
            FK_vehicle_locator: faker.datatype.number({ min: 1, max: 5 })
        },
        {
            doors_number: faker.datatype.number({ min: 2, max: 4 }),
            color: faker.color.human(),
            year_model: "2015",
            year_fabrication: "2019",
            date_creation: faker.date.past(1),
            plate: faker.vehicle.vrm(),
            chassis: faker.helpers.unique(faker.vehicle.vin),
            FK_vehicle_model: faker.datatype.number({ min: 1, max: 6 }),
            FK_vehicle_manufacturers: faker.datatype.number({ min: 1, max: 4 }),
            FK_vehicle_locator: faker.datatype.number({ min: 1, max: 5 })
        },
        {
            doors_number: faker.datatype.number({ min: 2, max: 4 }),
            color: faker.color.human(),
            year_model: "2015",
            year_fabrication: "2019",
            date_creation: faker.date.past(1),
            plate: faker.vehicle.vrm(),
            chassis: faker.helpers.unique(faker.vehicle.vin),
            FK_vehicle_model: faker.datatype.number({ min: 1, max: 6 }),
            FK_vehicle_manufacturers: faker.datatype.number({ min: 1, max: 4 }),
            FK_vehicle_locator: faker.datatype.number({ min: 1, max: 5 })
        },
        {
            doors_number: faker.datatype.number({ min: 2, max: 4 }),
            color: faker.color.human(),
            year_model: "2015",
            year_fabrication: "2019",
            date_creation: faker.date.past(1),
            plate: faker.vehicle.vrm(),
            chassis: faker.helpers.unique(faker.vehicle.vin),
            FK_vehicle_model: faker.datatype.number({ min: 1, max: 6 }),
            FK_vehicle_manufacturers: faker.datatype.number({ min: 1, max: 4 }),
            FK_vehicle_locator: faker.datatype.number({ min: 1, max: 5 })
        },
        {
            doors_number: faker.datatype.number({ min: 2, max: 4 }),
            color: faker.color.human(),
            year_model: "2015",
            year_fabrication: "2019",
            date_creation: faker.date.past(1),
            plate: faker.vehicle.vrm(),
            chassis: faker.helpers.unique(faker.vehicle.vin),
            FK_vehicle_model: faker.datatype.number({ min: 1, max: 6 }),
            FK_vehicle_manufacturers: faker.datatype.number({ min: 1, max: 4 }),
            FK_vehicle_locator: faker.datatype.number({ min: 1, max: 5 })
        },
        {
            doors_number: faker.datatype.number({ min: 2, max: 4 }),
            color: faker.color.human(),
            year_model: "2015",
            year_fabrication: "2019",
            date_creation: faker.date.past(1),
            plate: faker.vehicle.vrm(),
            chassis: faker.helpers.unique(faker.vehicle.vin),
            FK_vehicle_model: faker.datatype.number({ min: 1, max: 6 }),
            FK_vehicle_manufacturers: faker.datatype.number({ min: 1, max: 4 }),
            FK_vehicle_locator: faker.datatype.number({ min: 1, max: 5 })
        },
        {
            doors_number: faker.datatype.number({ min: 2, max: 4 }),
            color: faker.color.human(),
            year_model: "2015",
            year_fabrication: "2019",
            date_creation: faker.date.past(1),
            plate: faker.vehicle.vrm(),
            chassis: faker.helpers.unique(faker.vehicle.vin),
            FK_vehicle_model: faker.datatype.number({ min: 1, max: 6 }),
            FK_vehicle_manufacturers: faker.datatype.number({ min: 1, max: 4 }),
            FK_vehicle_locator: faker.datatype.number({ min: 1, max: 5 })
        },
        {
            doors_number: faker.datatype.number({ min: 2, max: 4 }),
            color: faker.color.human(),
            year_model: "2015",
            year_fabrication: "2019",
            date_creation: faker.date.past(1),
            plate: faker.vehicle.vrm(),
            chassis: faker.helpers.unique(faker.vehicle.vin),
            FK_vehicle_model: faker.datatype.number({ min: 1, max: 6 }),
            FK_vehicle_manufacturers: faker.datatype.number({ min: 1, max: 4 }),
            FK_vehicle_locator: faker.datatype.number({ min: 1, max: 5 })
        },
    ]);

};
