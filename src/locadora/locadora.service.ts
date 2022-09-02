import { Injectable } from '@nestjs/common';
import { CreateLocadoraDto } from './dto/create-locadora.dto';
import { UpdateLocadoraDto } from './dto/update-locadora.dto';

@Injectable()
export class LocadoraService {
  create(createLocadoraDto: CreateLocadoraDto) {
    return 'This action adds a new locadora';
  }

  findAll() {
    return `This action returns all locadora`;
  }

  findOne(id: number) {
    return `This action returns a #${id} locadora`;
  }

  update(id: number, updateLocadoraDto: UpdateLocadoraDto) {
    return `This action updates a #${id} locadora`;
  }

  remove(id: number) {
    return `This action removes a #${id} locadora`;
  }
}
