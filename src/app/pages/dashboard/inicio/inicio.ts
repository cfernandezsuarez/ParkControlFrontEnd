import { Component, OnInit, signal, inject, computed } from '@angular/core';
import {PlazaService} from '../../../services/plazaService';
import { TotalOcupacionPorPlantaDTO } from '../../../models/dto/plazasDto';
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
  ocupacionPorPlanta = signal<TotalOcupacionPorPlantaDTO | null>(null);

  error = signal<string | null>(null);
  cargando = signal<boolean>(false);

  primeraPlantaLibre = computed(() => this.primeraPlantaMax() - (this.ocupacionPorPlanta()?.primera ?? 0));
  segundaPlantaLibre = computed(() => this.segundaPlantaMax() - (this.ocupacionPorPlanta()?.segunda ?? 0));
  terceraPlantaLibre = computed(() => this.terceraPlantaMax() - (this.ocupacionPorPlanta()?.tercera ?? 0));

  ngOnInit() {
    this.cargando.set(true);
    this.error.set(null);

    forkJoin({
      ocupadas: this.plazaService.getPlazasOcupadas(),
      bloqueadas: this.plazaService.getPlazasBloqueadas(),
      totales: this.plazaService.getPlazasTotales(),
      ocupacionPorPlanta: this.plazaService.getPlazasOcupadasPorPlanta(),
      planta0Max: this.plazaService.getPlazasTotalesPorPlanta(0),
      plantaMenos1Max: this.plazaService.getPlazasTotalesPorPlanta(-1),
      plantaMenos2Max: this.plazaService.getPlazasTotalesPorPlanta(-2),
    }).subscribe({
      next: (datos) => {
        this.plazas.set(datos.ocupadas)
        this.plazasBloqueadas.set(datos.bloqueadas)
        this.plazasMax.set(datos.totales)
        this.ocupacionPorPlanta.set(datos.ocupacionPorPlanta)
        this.primeraPlantaMax.set(datos.planta0Max)
        this.segundaPlantaMax.set(datos.plantaMenos1Max)
        this.terceraPlantaMax.set(datos.plantaMenos2Max)
        this.cargando.set(false)
      },
      error: () => {
        this.cargando.set(false)
        this.error.set('Error al cargar los datos de plazas')
      },
    });
  }
}
