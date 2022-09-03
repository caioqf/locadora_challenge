import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
  ) {}

  async create(createLocadoraDto: CreateLocadoraDto) {
    try {
      await this.knex('general.locator').insert({
        loc_email: createLocadoraDto.email,
        loc_cnpj: createLocadoraDto.cnpj,
        loc_corporate_name: createLocadoraDto.corporateName,
        loc_trade_name: createLocadoraDto.tradeName,
        loc_telephone: createLocadoraDto.telephone,
      });

      return;
    } catch (error) {
      if (error.code === '23505')
        return new ServiceError(400, 'Locadora ja cadastrada');

      return new ServiceError(402, 'Ocorreu um erro.');
    }
  }

  async findAll(): Promise<Locadora[] | ServiceError> {
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
          loc_id: id,
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

  async update(id: number, updateLocadoraDto: UpdateLocadoraDto) {
    return `This action updates a #${id} locadora`;
  }

  async remove(id: number) {
    try {
      const exists = await this.findOne(id);

      if (!exists) {
        return new ServiceError(403, 'Locadora inexistente');
      }

      await this.knex('general.locator').delete('*').where({
        loc_id: id,
      });

      return HttpStatus.OK;
    } catch (error) {
      console.error(error);
      return new HttpException(
        'Erro ao deletar locadora.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
