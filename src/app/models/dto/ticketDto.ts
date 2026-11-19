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

export interface ImporteTicketDTO {
  ticketId: number;
  matricula: string;
  minutosTranscurridos: number;
  minutosCortesia: number;
  minutosCobrados: number;
  importe: number;
  mensaje: string;
}

export interface TicketPagadoDTO {
  ticketId: number;
  matricula: string;
  horaEntrada: string;
  horaSalida: string;
  minutosTotales: number;
  minutosDescuento: number;
  importeFinal: number;
  numeroPlaza: number;
  mensaje: string;
}
