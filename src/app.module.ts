import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LocadoraModule } from './locadora/locadora.module';
import { KnexModule } from 'nestjs-knex';
import { ManufacterModule } from './manufacturers/manufacturers.module';
import { VehicleModelModule } from './vehicle_model/vehicle_model.module';
import { VehicleModule } from './vehicle/vehicle.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env',
      isGlobal: true,
    }),
    KnexModule.forRoot({
      config: {
        client: 'pg',
        useNullAsDefault: true,
        connection: {
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
        },
      },
    }),
    LocadoraModule,
    ManufacterModule,
    VehicleModelModule,
    VehicleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
