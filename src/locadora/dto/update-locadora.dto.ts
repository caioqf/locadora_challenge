import { PartialType } from '@nestjs/mapped-types';
import { CreateLocadoraDto } from './create-locadora.dto';

export class UpdateLocadoraDto extends PartialType(CreateLocadoraDto) {}
