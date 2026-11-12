import { TipoPlaza } from '../enums';

export interface TicketEntradaRequest {
  matricula: string;
  tipoPlaza: TipoPlaza;
}
