import { Module } from '@nestjs/common';
import { ManufacterService } from './manufacturers.service';
import { ManufacterController } from './manufacter.controller';

@Module({
  controllers: [ManufacterController],
  providers: [ManufacterService]
})
export class ManufacterModule { }
