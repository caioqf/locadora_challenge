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
  year: string;

  @IsNotEmpty()
  @IsString()
  fabrication_year: string;

  @IsNotEmpty()
  @IsString()
  plate: string;

  @IsNotEmpty()
  creation_date: string;

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
