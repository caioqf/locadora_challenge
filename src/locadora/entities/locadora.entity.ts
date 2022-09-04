import { Exclude } from "class-transformer";
import { Address } from "../../types/Address";

export class Locadora {
  @Exclude()
  id: number;
  trade_name: string;
  corporate_name: string;
  cnpj: string;
  email: string;
  telephone: string;
  adress: Address
  constructor(partial: Partial<Locadora>) {
    Object.assign(this, partial);
  }
}
