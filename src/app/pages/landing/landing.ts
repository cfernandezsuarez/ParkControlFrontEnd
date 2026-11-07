import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { LucideArrowUpRight, LucideCircleGauge, LucideBadgePercent, LucideLockKeyhole, LucideUserGroup } from '@lucide/angular';
import { PlazaService } from '../../services/plazaService';
import { TotalOcupacionPorPlantaDTO } from '../../models/dto/plazasDto';

@Component({
  imports: [
    RouterLink,
    LucideArrowUpRight,
    LucideCircleGauge,
    LucideBadgePercent,
    LucideLockKeyhole,
    LucideUserGroup,
  ],
  selector: 'app-landing',
  standalone: true,
  styleUrl: './landing.css',
  templateUrl: './landing.html',
})
export class Landing implements OnInit {
  private plazaService = inject(PlazaService);

  plazas = signal<number>(0);
  plazasMax = signal<number>(200);
  primeraPlantaMax = signal<number>(200);
  segundaPlantaMax = signal<number>(200);
  terceraPlantaMax = signal<number>(200);
  plantas = signal<number>(3);
  ocupacionPorPlanta = signal<TotalOcupacionPorPlantaDTO | null>(null);

  error = signal<string | null>(null);
  cargando = signal<boolean>(false);

  primeraPlantaLibre = computed(() => this.primeraPlantaMax() - (this.ocupacionPorPlanta()?.primera ?? 0));
  segundaPlantaLibre = computed(() => this.segundaPlantaMax() - (this.ocupacionPorPlanta()?.segunda ?? 0));
  terceraPlantaLibre = computed(() => this.terceraPlantaMax() - (this.ocupacionPorPlanta()?.tercera ?? 0));

  ngOnInit() {
    this.cargando.set(true)
    this.error.set(null)

    forkJoin({
      plazasOcupadas: this.plazaService.getPlazasOcupadas(),
      plazasTotales: this.plazaService.getPlazasTotales(),
      ocupacionPorPlanta: this.plazaService.getPlazasOcupadasPorPlanta(),
      planta0Max: this.plazaService.getPlazasTotalesPorPlanta(0),
      plantaMenos1Max: this.plazaService.getPlazasTotalesPorPlanta(-1),
      plantaMenos2Max: this.plazaService.getPlazasTotalesPorPlanta(-2),
    }).subscribe({
      next: (datos) => {
        this.plazas.set(datos.plazasOcupadas)
        this.plazasMax.set(datos.plazasTotales)
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
