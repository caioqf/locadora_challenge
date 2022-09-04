import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateVehicleModelDto } from './dto/create-vehicle_model.dto';
import { UpdateVehicleModelDto } from './dto/update-vehicle_model.dto';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ServiceError } from '../errors/service-error';
import { VehicleModel } from './entities/vehicle_model.entity';

@Injectable()
export class VehicleModelService {
  constructor(
    @InjectKnex()
    private readonly knex: Knex,
  ) { }

  async create(createVehicleModelDto: CreateVehicleModelDto) {
    try {
      const model = await this.knex('general.model')
        .insert({
          name: createVehicleModelDto.name,
          FK_manufacturers: createVehicleModelDto.manufacturer
        })
        .returning('*')

      return model[0]
    } catch (error) {
      if (error.code === '23505') // baseado na tabela de erros do postgre: erro indica duplicacao de campo unico 
        return new ServiceError(400, 'Modelo ja cadastrado');

      return new ServiceError(402, 'Ocorreu um erro.');
    }
  }

  async findAll() {
    try {
      const allLocators = await this.knex('general.model').select('*');

      return allLocators;
    } catch (error) {
      return new ServiceError(400, 'Ocorreu um erro');
    }
  }

  async findOne(id: number) {
    try {
      const model = await this.knex('general.model')
        .where({
          id: id,
        })
        .first();

      if (!model || model === undefined) {
        return new ServiceError(400, 'Modelo não encontrado');
      }

      return model;
    } catch (error) {
      return new ServiceError(403, 'Ocorreu um erro');
    }
  }

  async update(id: number, updateVehicleModelDto: UpdateVehicleModelDto): Promise<VehicleModel | ServiceError | any> {
    try {
      const res = await this.knex('general.model')
        .update({
          name: updateVehicleModelDto?.name,
        })
        .where({
          id: id
        })
        .returning('*')

      return res
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

      await this.knex('general.model')
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
        'Erro ao deletar vehicle_model.'
      );
    }
  }
}
