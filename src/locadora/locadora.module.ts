import { Module } from '@nestjs/common';
import { LocadoraService } from './locadora.service';
import { LocadoraController } from './locadora.controller';

@Module({
  controllers: [LocadoraController],
  providers: [LocadoraService]
})
export class LocadoraModule {}
