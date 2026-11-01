import { TotalPlazasOcupadasDTO } from './dto/plazasDto';
import { TipoPlaza, EstadoPlaza } from './enums';

export class Plazas {
    constructor(
        readonly id: number,
        public numero: number,
        public planta: number,
        public tipo: TipoPlaza,
        public estado: EstadoPlaza,
    ) {}
}