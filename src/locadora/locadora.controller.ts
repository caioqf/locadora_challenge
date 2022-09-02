import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocadoraService } from './locadora.service';
import { CreateLocadoraDto } from './dto/create-locadora.dto';
import { UpdateLocadoraDto } from './dto/update-locadora.dto';

@Controller('locadora')
export class LocadoraController {
  constructor(private readonly locadoraService: LocadoraService) {}

  @Post()
  create(@Body() createLocadoraDto: CreateLocadoraDto) {
    return this.locadoraService.create(createLocadoraDto);
  }

  @Get()
  findAll() {
    return this.locadoraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locadoraService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocadoraDto: UpdateLocadoraDto) {
    return this.locadoraService.update(+id, updateLocadoraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locadoraService.remove(+id);
  }
}
