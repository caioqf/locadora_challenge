import { Exclude } from "class-transformer";

export class Locadora {
  @Exclude()
  id: number;
  trade_name: string;
  corporate_name: string;
  cnpj: string;
  email: string;
  telephone: string;

  constructor(partial: Partial<Locadora>) {
    Object.assign(this, partial);
  }
}
