
export class Tarifa {
  constructor(
    readonly id: number,
    public topeMaximo: number,
    public fecha: string,
    public minCortesia: number,
    public precio: number
  ) {}
}
