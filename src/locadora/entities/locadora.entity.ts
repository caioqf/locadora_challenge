export class Locadora {
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
