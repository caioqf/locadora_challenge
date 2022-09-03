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
  ) { }

  async create(createLocadoraDto: CreateLocadoraDto) {
    try {
      await this.knex('general.locator').insert({
        email: createLocadoraDto.email,
        cnpj: createLocadoraDto.cnpj,
        corporate_name: createLocadoraDto.corporateName,
        trade_name: createLocadoraDto.tradeName,
        telephone: createLocadoraDto.telephone,
      });

      return;
    } catch (error) {
      if (error.code === '23505') // baseado na tabela de erros do postgre: erro indica duplicacao de campo unico 
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

      return HttpStatus.OK;
    } catch (error) {
      return new ServiceError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Erro ao deletar locadora.'
      );
    }
  }
}
