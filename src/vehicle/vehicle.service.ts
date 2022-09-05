import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ServiceError } from '../errors/service-error';
import { Vehicle } from './entities/vehicle.entity';
import { TransferVehicleDTO } from './dto/transfer-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectKnex()
    private readonly knex: Knex,
  ) { }

  async create(createVehicleDto: CreateVehicleDto) {
    try {
      const locator = await this.knex('general.vehicle')
        .insert({
          doors_number: createVehicleDto.doors_number,
          color: createVehicleDto.color,
          year_model: createVehicleDto.year_model,
          year_fabrication: createVehicleDto.year_fabrication,
          date_creation: createVehicleDto.date_creation,
          plate: createVehicleDto.plate,
          chassis: createVehicleDto.chassis,
          FK_vehicle_manufacturers: createVehicleDto.vehicle_manufacturer,
          FK_vehicle_model: createVehicleDto.vehicle_model,
          FK_vehicle_locator: createVehicleDto.vehicle_locator
        })
        .returning('*')

      return locator[0]
    } catch (error) {
      console.log(error);

      if (error.code === '23505') // baseado na tabela de erros do postgre: erro indica duplicacao de campo unico 
        return new ServiceError(400, 'Veículo ja cadastrado');

      return new ServiceError(402, 'Ocorreu um erro.');
    }
  }

  async findAll() {
    try {
      const allVehicles = await this.knex('general.vehicle as v')
        .select('v.id', 'doors_number', 'color', 'year_model', 'year_fabrication', 'date_creation', 'plate', 'chassis', 'm.name as manufacturer', 'mo.name as model', 'l.corporate_name as locator')
        .join('general.manufacturers as m', 'm.id', '=', 'FK_vehicle_manufacturers')
        .join('general.model as mo', 'mo.id', '=', 'FK_vehicle_model')
        .join('general.locator as l', 'l.id', '=', 'FK_vehicle_locator')

      if (!allVehicles) {
        return new ServiceError(400, 'Dados não encontrados');
      }

      return allVehicles;
    } catch (error) {
      console.log(error);

      return new ServiceError(400, 'Ocorreu um erro');
    }
  }

  async findOne(id: number) {
    try {
      const vehicle = await this.knex('general.vehicle as v')
        .select('v.id', 'doors_number', 'color', 'year_model', 'year_fabrication', 'date_creation', 'plate', 'chassis', 'm.name as manufacturer', 'mo.name as model', 'l.corporate_name as locator')
        .join('general.manufacturers as m', 'm.id', '=', 'FK_vehicle_manufacturers')
        .join('general.model as mo', 'mo.id', '=', 'FK_vehicle_model')
        .join('general.locator as l', 'l.id', '=', 'FK_vehicle_locator')
        .where({
          'v.id': id,
        })
        .first();

      if (!vehicle || vehicle === undefined) {
        return new ServiceError(400, 'Veículo não encontrado');
      }

      return vehicle;
    } catch (error) {
      console.log(error);

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

  async transferVehicleLocator(transferVehicleDTO: TransferVehicleDTO) {

    const transaction = await this.knex.transaction()

    try {

      const vehicle = await this.findOne(transferVehicleDTO.vehicle_id)

      if (parseInt(vehicle.FK_vehicle_locator) === transferVehicleDTO.new_locator_id) {
        return new ServiceError(400, "Veículo ja se encontra nesta locadora.")
      }

      // atualiza referencia de locadora na tabela de veiculo
      await this.knex('general.vehicle')
        .update({
          FK_vehicle_locator: transferVehicleDTO.new_locator_id
        })
        .where({
          id: transferVehicleDTO.vehicle_id
        })

      // atualiza ultimo log
      await this.knex('general.vehicle_locator')
        .update({
          transefer_date: this.knex.fn.now(),
        })
        .where({
          FK_vehicle: transferVehicleDTO.vehicle_id,
          transefer_date: null
        })

      // insere novo log
      await this.knex('general.vehicle_locator')
        .insert({
          FK_vehicle: transferVehicleDTO.vehicle_id,
          FK_vehicle_locator: transferVehicleDTO.new_locator_id,
          register_date: this.knex.fn.now(),
          transefer_date: null
        })

      await transaction.commit()

      return {
        statusCode: 200,
        message: `Transeferido veículo ${vehicle.id} para locadora ${transferVehicleDTO.new_locator_id} com sucesso!`
      }
    } catch (error) {

      // cancela a transação caso erro
      await transaction.rollback()

      return new ServiceError(400, 'Erro ao realizar transferência de veículo.')

    }

  }

  async getVehiclesLog() {

    const vehicles = await this.findAll()

    if (vehicles instanceof ServiceError) return vehicles

    const data = vehicles.map(async element => {

      const vehicleLOG = await this.knex('general.vehicle_locator')
        .where({
          FK_vehicle: element.id
        })

      const vehicleInfo = {
        id: element.id,
        locator: element.locator,
        manufacturer: element.manufacturer,
        model: element.model,
        log: vehicleLOG
      }

      return vehicleInfo
    });

    return Promise.all(data)

  }
}

[
  {
    id: 1,
    locadora: 'XPTO',
    montadora: 'Wolkswagen',
    modelo: 'GOL',
    log: [
      {

      }
    ]
  }
]