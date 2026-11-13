import {EstadoTicket, TipoPlaza} from '../enums';

export interface TicketEntradaRequest {
  matricula: string;
  tipoPlaza: TipoPlaza;
}

export interface TicketDTO {
  id: number;
  matricula: string;
  horaEntrada: string;
  horaSalida: string | null;
  minutosTotales: number;
  importe: number;
  estado: EstadoTicket;
  numeroPlaza: number | null;
}
