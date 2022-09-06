import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateLocadoraDto } from './dto/create-locadora.dto';
import { UpdateLocadoraDto } from './dto/update-locadora.dto';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ServiceError } from '../errors/service-error';
import { Locadora } from './entities/locadora.entity';

@Injectable()
export class LocadoraService {
  constructor(
    @InjectKnex()
    private readonly knex: Knex,
  ) { }

  async create(createLocadoraDto: CreateLocadoraDto) {
    try {
      const locator = await this.knex('general.locator')
        .insert({
          trade_name: createLocadoraDto.trade_name,
          corporate_name: createLocadoraDto.corporate_name,
          cnpj: createLocadoraDto.cnpj,
          email: createLocadoraDto.email,
          telephone: createLocadoraDto.telephone,
          address: createLocadoraDto.address,
        })
        .returning('*')

      return locator[0]
    } catch (error) {
      if (error.code === '23505') // baseado na tabela de erros do postgre: erro indica duplicacao de campo unico 
        return new ServiceError(400, 'Locadora ja cadastrada');

      return new ServiceError(402, 'Ocorreu um erro.');
    }
  }

  async findAll() {
    try {
      const allLocators = await this.knex('general.locator').select('*');

      if (!allLocators) {
        return new ServiceError(400, 'Dados não encontrados');
      }

      return allLocators;
    } catch (error) {
      return new ServiceError(400, 'Ocorreu um erro');
    }
  }

  async findOne(id: number) {
    try {
      const locator = await this.knex('general.locator')
        .where({
          id: id,
        })
        .first();

      if (!locator || locator === undefined) {
        return new ServiceError(400, 'Locadora não encontrada');
      }

      return locator;
    } catch (error) {
      return new ServiceError(403, 'Ocorreu um erro');
    }
  }

  async update(id: number, updateLocadoraDto: UpdateLocadoraDto): Promise<Locadora | ServiceError | any> {
    try {
      const res = await this.knex('general.locator')
        .update({
          email: updateLocadoraDto?.email,
          telephone: updateLocadoraDto?.telephone
        })
        .where({
          id: id
        })

      return
    } catch (error) {
      return new ServiceError(500, 'Erro ao atualizar.')
    }

  }

  async remove(id: number) {
    try {
      const exists = await this.findOne(id);

      if (exists instanceof ServiceError) {
        return new ServiceError(exists.code, exists.message);
      }

      await this.knex('general.locator')
        .delete('*')
        .where({
          id: id,
        });

      return {
        statusCode: HttpStatus.OK,
        message: "Deleted."
      }
    } catch (error) {
      return new ServiceError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Erro ao deletar locadora.'
      );
    }
  }

  async getVehiclesQuantity(id: number) {

    const locator = await this.findOne(id)

    const vehiclesInfo = await this.knex('general.vehicle as v')
      .select('v.id', 'doors_number', 'color', 'year_model', 'year_fabrication', 'date_creation', 'plate', 'chassis', 'm.name as manufacturer', 'mo.name as model', 'l.corporate_name as locator', 'm.id as manu_id', 'mo.id as mod_id')
      .join('general.manufacturers as m', 'm.id', '=', 'FK_vehicle_manufacturers')
      .join('general.model as mo', 'mo.id', '=', 'FK_vehicle_model')
      .join('general.locator as l', 'l.id', '=', 'FK_vehicle_locator')
      .where({
        FK_vehicle_locator: id
      })

    const logs = vehiclesInfo.map(async (element) => {

      const ocurrences = await this.knex.raw(`
      SELECT v."FK_vehicle_model", m."name" as model, COUNT(*) as  Occurences
      FROM "general".vehicle v
      join "general".model m on v."FK_vehicle_model" = m.id 
      where v."id" = ${element.id} and "FK_vehicle_locator" = ${id}
      GROUP BY v."FK_vehicle_model",  m.name
      `)

      return {
        manufacturer: element.manufacturer,
        model: element.model,
        quantity: ocurrences.rows[0].occurences
      }

    })

    const info = {
      locator: locator.corporate_name,
      vehicles: await Promise.all(logs)
    }

    return info
  }
}

