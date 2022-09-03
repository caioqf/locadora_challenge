import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class CreateLocadoraDto {

  @IsNotEmpty()
  @IsString()
  tradeName: string;

  @IsNotEmpty()
  @IsString()
  corporateName: string;

  @IsNotEmpty()
  @IsString()
  cnpj: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  telephone: string;
}
