import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateVehicleDto {

  @IsNumber()
  @IsNotEmpty()
  doorsNumber: number;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsString()
  model_year: string;

  @IsNotEmpty()
  @IsString()
  fabrication_year: string;

  @IsNotEmpty()
  register_date: string;

  @IsNotEmpty()
  @IsString()
  plate: string;

  @IsNotEmpty()
  @IsString()
  chassis: string;

  @IsNotEmpty()
  @IsNumber()
  manufacturer: number;

  @IsNotEmpty()
  @IsNumber()
  model: number;

  @IsNotEmpty()
  @IsNumber()
  current_locator: number;
}
