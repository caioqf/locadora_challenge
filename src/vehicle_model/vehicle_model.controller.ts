import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Put } from '@nestjs/common';
import { VehicleModelService } from './vehicle_model.service';
import { CreateVehicleModelDto } from './dto/create-vehicle_model.dto';
import { UpdateVehicleModelDto } from './dto/update-vehicle_model.dto';
import { ServiceError } from '../errors/service-error';

@Controller('vehicle-model')
export class VehicleModelController {
  constructor(private readonly vehicleModelService: VehicleModelService) { }

  @Post()
  async create(@Body() createVehicleModelDto: CreateVehicleModelDto) {
    const res = await this.vehicleModelService.create(createVehicleModelDto);
    if (res instanceof ServiceError)
      throw new HttpException(res.message, res.code);
    return res;
  }

  @Get()
  async findAll() {
    const res = await this.vehicleModelService.findAll();
    if (res instanceof ServiceError)
      throw new HttpException(res.message, res.code);
    return res;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const res = await this.vehicleModelService.findOne(+id);
    if (res instanceof ServiceError)
      throw new HttpException(res.message, res.code);
    return res;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateVehicleModelDto: UpdateVehicleModelDto) {
    const res = await this.vehicleModelService.update(+id, updateVehicleModelDto);
    if (res instanceof ServiceError)
      throw new HttpException(res.message, res.code);
    return res;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const res = await this.vehicleModelService.remove(+id);
    if (res instanceof ServiceError)
      throw new HttpException(res.message, res.code);
    return res;
  }
}
