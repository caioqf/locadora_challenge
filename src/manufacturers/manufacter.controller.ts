import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { ManufacterService } from './manufacturers.service';
import { CreateManufacterDto } from './dto/create-manufacturers.dto';
import { ServiceError } from '../errors/service-error';

@Controller('manufacturers')
export class ManufacterController {
  constructor(private readonly manufacterService: ManufacterService) { }

  @Post()
  async create(@Body() createManufacterDto: CreateManufacterDto) {
    const res = await this.manufacterService.create(CreateManufacterDto);
    if (res instanceof ServiceError)
      throw new HttpException(res.message, res.code);
    return res;
  }

  @Get()
  async findAll() {
    const res = await this.manufacterService.findAll();
    if (res instanceof ServiceError)
      throw new HttpException(res.message, res.code);
    return res;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const res = await this.manufacterService.findOne(+id);
    if (res instanceof ServiceError)
      throw new HttpException(res.message, res.code);
    return res;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const res = await this.manufacterService.remove(+id);
    if (res instanceof ServiceError)
      throw new HttpException(res.message, res.code);
    return res;
  }
}
