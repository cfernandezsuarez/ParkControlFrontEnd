import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { PlazaService } from '../../../services/plazaService';
import { PlazasOcupacionDTO, EstadisticaPlazasDTO, PlazaDTO } from '../../../models/dto/plazasDto';
import { forkJoin } from 'rxjs';

@Component({
  imports: [],
  selector: 'app-inicio',
  styleUrl: './inicio.css',
  templateUrl: './inicio.html',
})
export class Inicio implements OnInit {

  private plazaService = inject(PlazaService);

  plazas = signal<number>(0);
  plazasMax = signal<number>(200);
  primeraPlantaMax = signal<number>(0);
  segundaPlantaMax = signal<number>(0);
  terceraPlantaMax = signal<number>(0);
  plazasBloqueadas = signal<number>(0);
  plazasOcupacion = signal<PlazasOcupacionDTO | null>(null);

  error = signal<string | null>(null);
  cargando = signal<boolean>(false);

  estadisticaVacia: EstadisticaPlazasDTO = { libres: 0, ocupadas: 0, bloqueadas: 0, capacidad: 0 };

  primeraPlantaLibre = computed(() => this.plazasOcupacion()?.planta?.primera?.libres ?? 0);
  segundaPlantaLibre = computed(() => this.plazasOcupacion()?.planta?.segunda?.libres ?? 0);
  terceraPlantaLibre = computed(() => this.plazasOcupacion()?.planta?.tercera?.libres ?? 0);

  primeraNormal = computed(() => this.plazasOcupacion()?.planta?.primera?.tipo?.normal ?? this.estadisticaVacia);
  primeraPmr = computed(() => this.plazasOcupacion()?.planta?.primera?.tipo?.pmr ?? this.estadisticaVacia);
  primeraElectrica = computed(() => this.plazasOcupacion()?.planta?.primera?.tipo?.electrica ?? this.estadisticaVacia);

  segundaNormal = computed(() => this.plazasOcupacion()?.planta?.segunda?.tipo?.normal ?? this.estadisticaVacia);
  segundaPmr = computed(() => this.plazasOcupacion()?.planta?.segunda?.tipo?.pmr ?? this.estadisticaVacia);
  segundaElectrica = computed(() => this.plazasOcupacion()?.planta?.segunda?.tipo?.electrica ?? this.estadisticaVacia);

  terceraNormal = computed(() => this.plazasOcupacion()?.planta?.tercera?.tipo?.normal ?? this.estadisticaVacia);
  terceraPmr = computed(() => this.plazasOcupacion()?.planta?.tercera?.tipo?.pmr ?? this.estadisticaVacia);
  terceraElectrica = computed(() => this.plazasOcupacion()?.planta?.tercera?.tipo?.electrica ?? this.estadisticaVacia);

  primeraPlantaOcupadas = computed(() => this.plazasOcupacion()?.planta?.primera?.ocupadas ?? 0);
  primeraPlantaBloqueadas = computed(() => this.plazasOcupacion()?.planta?.primera?.bloqueadas ?? 0);

  segundaPlantaOcupadas = computed(() => this.plazasOcupacion()?.planta?.segunda?.ocupadas ?? 0);
  segundaPlantaBloqueadas = computed(() => this.plazasOcupacion()?.planta?.segunda?.bloqueadas ?? 0);

  terceraPlantaOcupadas = computed(() => this.plazasOcupacion()?.planta?.tercera?.ocupadas ?? 0);
  terceraPlantaBloqueadas = computed(() => this.plazasOcupacion()?.planta?.tercera?.bloqueadas ?? 0);

  ngOnInit() {
    this.cargando.set(true);
    this.error.set(null);

    forkJoin({
      plazasOcupacion: this.plazaService.getPlazasOcupacion(),
      bloqueadas: this.plazaService.getPlazasBloqueadas(),
      totales: this.plazaService.getPlazasTotales(),
      plantaCeroMax: this.plazaService.getPlazasTotalesPorPlanta(0),
      plantaMenos1Max: this.plazaService.getPlazasTotalesPorPlanta(-1),
      plantaMenos2Max: this.plazaService.getPlazasTotalesPorPlanta(-2),
    }).subscribe({
      next: (datos) => {
        this.plazas.set(datos.plazasOcupacion.total?.ocupadas ?? 0);
        this.plazasBloqueadas.set(datos.bloqueadas);
        this.plazasMax.set(datos.totales);
        this.plazasOcupacion.set(datos.plazasOcupacion);
        this.primeraPlantaMax.set(datos.plantaCeroMax);
        this.segundaPlantaMax.set(datos.plantaMenos1Max);
        this.terceraPlantaMax.set(datos.plantaMenos2Max);
        this.cargando.set(false);
      },
      error: () => {
        this.cargando.set(false);
        this.error.set('Error al cargar los datos de plazas');
      },
    });
  }
}
