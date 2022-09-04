import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Put } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { ServiceError } from '../errors/service-error';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) { }

  @Post()
  async create(@Body() createVehicleDto: CreateVehicleDto) {
    const res = await this.vehicleService.create(createVehicleDto);
    if (res instanceof ServiceError)
      throw new HttpException(res.message, res.code);
    return res;
  }

  @Get()
  async findAll() {
    const res = await this.vehicleService.findAll();
    if (res instanceof ServiceError)
      throw new HttpException(res.message, res.code);
    return res;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const res = await this.vehicleService.findOne(+id);
    if (res instanceof ServiceError)
      throw new HttpException(res.message, res.code);
    return res;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    const res = await this.vehicleService.update(+id, updateVehicleDto);
    if (res instanceof ServiceError)
      throw new HttpException(res.message, res.code);
    return res;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const res = await this.vehicleService.remove(+id);
    if (res instanceof ServiceError)
      throw new HttpException(res.message, res.code);
    return res;
  }

  @Get('/log/:id')
  async getVehicleLog(@Param('id') id: string) {
    return this.vehicleService.getVehicleLog(+id);
  }

  //   @Get('/log')
  //   async getVehiclesLogs() {
  //     return this.vehicleService.getAllLogs();
  //   }
}
