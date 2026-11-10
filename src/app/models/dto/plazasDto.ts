export interface PlazaDTO {
  id: number;
  numero: number;
  planta: number;
  tipo: 'NORMAL' | 'PMR' | 'ELECTRICA';
  estado: 'LIBRE' | 'OCUPADA' | 'BLOQUEADA';
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
  };
}
