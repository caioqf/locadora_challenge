import { Module } from '@nestjs/common';
import { LocadoraService } from './locadora.service';
import { LocadoraController } from './locadora.controller';
import { VehicleModule } from '../vehicle/vehicle.module';
import { VehicleService } from '../vehicle/vehicle.service';

@Module({
  imports: [VehicleModule],
  controllers: [LocadoraController],
  providers: [LocadoraService, VehicleService]
})
export class LocadoraModule { }
