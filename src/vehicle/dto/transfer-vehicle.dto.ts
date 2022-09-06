import { IsNotEmpty, IsNumber } from "class-validator";

export class TransferVehicleDTO {

  @IsNumber()
  @IsNotEmpty()
  vehicle_id: number

  @IsNumber()
  @IsNotEmpty()
  new_locator_id: number
}