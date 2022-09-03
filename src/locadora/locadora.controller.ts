import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { LocadoraService } from './locadora.service';
import { CreateLocadoraDto } from './dto/create-locadora.dto';
import { UpdateLocadoraDto } from './dto/update-locadora.dto';
import { Locadora } from './entities/locadora.entity';
import { ServiceError } from '../errors/service-error';

@Controller('locadora')
export class LocadoraController {
  constructor(private readonly locadoraService: LocadoraService) {}

  @Post()
  async create(@Body() createLocadoraDto: CreateLocadoraDto) {
    const res = await this.locadoraService.create(createLocadoraDto);
    if (res instanceof ServiceError)
      throw new HttpException(res.message, res.code);
    return res;
  }

  @Get()
  async findAll(): Promise<Locadora[] | ServiceError> {
    const res = await this.locadoraService.findAll();
    if (res instanceof ServiceError)
      throw new HttpException(res.message, res.code);
    return res;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const res = await this.locadoraService.findOne(+id);
    if (res instanceof ServiceError)
      throw new HttpException(res.message, res.code);
    return res;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLocadoraDto: UpdateLocadoraDto,
  ) {
    const res = await this.locadoraService.update(+id, updateLocadoraDto);
    if (res instanceof ServiceError)
      throw new HttpException(res.message, res.code);
    return res;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locadoraService.remove(+id);
  }
}
