import { Exclude } from "class-transformer";

export class Locadora {
  @Exclude()
  id: number;
  tradeName: string;
  corporateName: string;
  cnpj: string;
  email: string;
  telephone: string;

  constructor(partial: Partial<Locadora>) {
    Object.assign(this, partial);
  }
}
