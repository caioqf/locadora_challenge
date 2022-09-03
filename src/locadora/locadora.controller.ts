import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { LocadoraService } from './locadora.service';
import { CreateLocadoraDto } from './dto/create-locadora.dto';
import { UpdateLocadoraDto } from './dto/update-locadora.dto';
import { Locadora } from './entities/locadora.entity';
import { ServiceError } from '../errors/service-error';

@Controller('locadora')
export class LocadoraController {
  constructor(private readonly locadoraService: LocadoraService) { }

  @UseInterceptors(ClassSerializerInterceptor)
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

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const res = await this.locadoraService.findOne(+id);
    if (res instanceof ServiceError)
      throw new HttpException(res.message, res.code);
    return new Locadora(res);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLocadoraDto: UpdateLocadoraDto,
  ) {
    const res = await this.locadoraService.update(+id, updateLocadoraDto);
    if (res instanceof ServiceError)
      throw new HttpException(res.message, res.code);
    return res;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const res = await this.locadoraService.remove(+id);
    if (res instanceof ServiceError)
      throw new HttpException(res.message, res.code);
    return res;
  }
}
