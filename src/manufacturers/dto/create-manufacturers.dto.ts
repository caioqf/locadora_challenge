import { IsNotEmpty } from "class-validator";

export class CreateManufacterDto {

  @IsNotEmpty()
  name: string
}
