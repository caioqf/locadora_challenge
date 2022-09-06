import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateVehicleDto {

  @IsNumber()
  @IsNotEmpty()
  doors_number: number;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsString()
  year_model: string;

  @IsNotEmpty()
  @IsString()
  year_fabrication: string;

  @IsNotEmpty()
  date_creation: string;

  @IsNotEmpty()
  @IsString()
  plate: string;

  @IsNotEmpty()
  @IsString()
  chassis: string;

  @IsNotEmpty()
  @IsNumber()
  vehicle_locator: number;

  @IsNotEmpty()
  @IsNumber()
  vehicle_model: number;

  @IsNotEmpty()
  @IsNumber()
  vehicle_manufacturer: number;

}
