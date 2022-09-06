import { Knex } from "knex";
import { faker } from '@faker-js/faker'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("general.locator").del();

    // Inserts seed entries
    await knex("general.locator").insert([
        {
            trade_name: `${faker.company.name()} LTDA`,
            corporate_name: faker.company.name(),
            cnpj: faker.random.numeric(14),
            email: faker.internet.email(),
            telephone: faker.phone.number('11#########'),
            address: {
                street: faker.address.street(),
                cep: faker.address.zipCode(),
                building_number: faker.address.buildingNumber(),
                district: faker.address.street(),
                state: faker.address.state(),
                city: faker.address.city(),
            }
        },
        {
            trade_name: `${faker.company.name()} LTDA`,
            corporate_name: faker.company.name(),
            cnpj: faker.random.numeric(14),
            email: faker.internet.email(),
            telephone: faker.phone.number('11#########'),
            address: {
                street: faker.address.street(),
                cep: faker.address.zipCode(),
                building_number: faker.address.buildingNumber(),
                district: faker.address.street(),
                state: faker.address.state(),
                city: faker.address.city(),
            }
        },
        {
            trade_name: `${faker.company.name()} LTDA`,
            corporate_name: faker.company.name(),
            cnpj: faker.random.numeric(14),
            email: faker.internet.email(),
            telephone: faker.phone.number('11#########'),
            address: {
                street: faker.address.street(),
                cep: faker.address.zipCode(),
                building_number: faker.address.buildingNumber(),
                district: faker.address.street(),
                state: faker.address.state(),
                city: faker.address.city(),
            }
        },
        {
            trade_name: `${faker.company.name()} LTDA`,
            corporate_name: faker.company.name(),
            cnpj: faker.random.numeric(14),
            email: faker.internet.email(),
            telephone: faker.phone.number('11#########'),
            address: {
                street: faker.address.street(),
                cep: faker.address.zipCode(),
                building_number: faker.address.buildingNumber(),
                district: faker.address.street(),
                state: faker.address.state(),
                city: faker.address.city(),
            }
        },
        {
            trade_name: `${faker.company.name()} LTDA`,
            corporate_name: faker.company.name(),
            cnpj: faker.random.numeric(14),
            email: faker.internet.email(),
            telephone: faker.phone.number('11#########'),
            address: {
                street: faker.address.street(),
                cep: faker.address.zipCode(),
                building_number: faker.address.buildingNumber(),
                district: faker.address.street(),
                state: faker.address.state(),
                city: faker.address.city(),
            }
        },
    ]);
};
