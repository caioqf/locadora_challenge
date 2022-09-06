import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateManufacterDto } from './dto/create-manufacturers.dto';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ServiceError } from '../errors/service-error';

@Injectable()
export class ManufacterService {
  constructor(
    @InjectKnex()
    private readonly knex: Knex,
  ) { }

  async create(createManufacterDto: CreateManufacterDto) {
    try {
      const manufacturers = await this.knex('general.manufacturers')
        .insert(createManufacterDto)
        .returning('*')

      return manufacturers[0]
    } catch (error) {
      if (error.code === '23505') // baseado na tabela de erros do postgre: erro indica duplicacao de campo unico 
        return new ServiceError(400, 'Montadora ja cadastrada');

      return new ServiceError(402, 'Ocorreu um erro.');
    }
  }

  async findAll() {
    try {
      const allManufacturers = await this.knex('general.manufacturers').select('*');
      return allManufacturers;
    } catch (error) {
      return new ServiceError(400, 'Ocorreu um erro');
    }
  }

  async findOne(id: number) {
    try {
      const manufacturers = await this.knex('general.manufacturers')
        .where({
          id: id,
        })
        .first();

      if (!manufacturers || manufacturers === undefined) {
        return new ServiceError(400, 'Montadora não encontrada');
      }

      return manufacturers;
    } catch (error) {
      return new ServiceError(403, 'Ocorreu um erro');
    }
  }

  async remove(id: number) {
    try {
      const exists = await this.findOne(id);

      if (exists instanceof ServiceError) {
        return new ServiceError(exists.code, exists.message);
      }

      await this.knex('general.manufacters')
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
        'Erro ao deletar fabricante.'
      );
    }
  }
}
