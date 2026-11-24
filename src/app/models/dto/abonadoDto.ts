export interface AbonadoDTO {
  id: number;
  email: string;
  nombre: string;
  matricula: string;
  fechaInicio: string;
  fechaFin: string;
}

export interface CrearAbonadoRequest {
  email: string;
  nombre: string;
  matricula: string;
  fechaInicio: string;
  fechaFin: string;
}

export interface ActualizarAbonadoDTO {
  email?: string;
  nombre?: string;
  matricula?: string;
  fechaInicio?: string;
  fechaFin?: string;
}
