import { TipoPlaza, EstadoPlaza } from './enums';

export interface Plazas {
  id: number;
  numero: number;
  planta: number;
  tipo: TipoPlaza;
  estado: EstadoPlaza;
}
