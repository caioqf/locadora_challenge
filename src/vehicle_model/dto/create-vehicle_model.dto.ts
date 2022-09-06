import { IsNotEmpty } from "class-validator";

export class CreateVehicleModelDto {

  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  manufacturer: number
}
