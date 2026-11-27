import {EstadoPlaza, TipoPlaza} from '../enums';

export interface PlazaDTO {
  id: number;
  numero: number;
  planta: number;
  tipo: TipoPlaza;
  estado: EstadoPlaza;
}

export interface EstadisticaPlazasDTO {
  libres: number;
  ocupadas: number;
  bloqueadas: number;
  capacidad: number;
}

export interface TipoPlazasDTO {
  normal: EstadisticaPlazasDTO;
  pmr: EstadisticaPlazasDTO;
  electrica: EstadisticaPlazasDTO;
}

export interface ResumenPlantaDTO extends EstadisticaPlazasDTO {
  tipo: TipoPlazasDTO;
}

export interface PlazasOcupacionDTO {
  total: EstadisticaPlazasDTO;
  tipo: TipoPlazasDTO;
  planta: {
    primera: ResumenPlantaDTO;
    segunda: ResumenPlantaDTO;
    tercera: ResumenPlantaDTO;
  }
}

export interface CrearPlazaRequest {
  numero: string;
  tipo: TipoPlaza;
}

export interface ActualizarPlazaRequest {
  numero: string;
  estado: EstadoPlaza;
}
