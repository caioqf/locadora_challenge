import { IsEmail, IsNotEmpty, IsObject, IsString } from "class-validator";

export class CreateLocadoraDto {

  @IsNotEmpty()
  @IsString()
  trade_name: string;

  @IsNotEmpty()
  @IsString()
  corporate_name: string;

  @IsNotEmpty()
  @IsString()
  cnpj: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  telephone: string;

  @IsNotEmpty()
  @IsObject()
  address
}
