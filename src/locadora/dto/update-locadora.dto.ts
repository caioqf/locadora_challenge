import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateLocadoraDto } from './create-locadora.dto';

export class UpdateLocadoraDto extends PartialType(CreateLocadoraDto) {

  readonly email?: string;
  readonly telephone?: string;
}
