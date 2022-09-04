import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ServiceError } from '../errors/service-error';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectKnex()
    private readonly knex: Knex,
  ) { }

  async create(createVehicleDto: CreateVehicleDto) {
    try {
      const locator = await this.knex('general.vehicle')
        .insert(createVehicleDto)
        .returning('*')

      return locator[0]
    } catch (error) {
      if (error.code === '23505') // baseado na tabela de erros do postgre: erro indica duplicacao de campo unico 
        return new ServiceError(400, 'Veículo ja cadastrado');

      return new ServiceError(402, 'Ocorreu um erro.');
    }
  }

  async findAll() {
    try {
      const allVehicles = await this.knex('general.vehicle').select('*');

      if (!allVehicles) {
        return new ServiceError(400, 'Dados não encontrados');
      }

      return allVehicles;
    } catch (error) {
      return new ServiceError(400, 'Ocorreu um erro');
    }
  }

  async findOne(id: number) {
    try {
      const vehicle = await this.knex('general.vehicle')
        .where({
          id: id,
        })
        .first();

      if (!vehicle || vehicle === undefined) {
        return new ServiceError(400, 'Veículo não encontrado');
      }

      return vehicle;
    } catch (error) {
      return new ServiceError(403, 'Ocorreu um erro');
    }
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle | ServiceError | any> {
    try {
      await this.knex('general.vehicle')
        .update(updateVehicleDto)
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

      await this.knex('general.vehicle')
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
        'Erro ao deletar Veículo.'
      );
    }
  }

  async getVehicleLog(id: number) {
    await this.knex('general')
      .select('view')
  }
}
