import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { LucideArrowUpRight, LucideCircleGauge, LucideBadgePercent, LucideLockKeyhole, LucideUserGroup } from '@lucide/angular';
import { PlazaService } from '../../services/plazaService';
import { PlazasOcupacionDTO } from '../../models/dto/plazasDto';

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
  plazasOcupacion = signal<PlazasOcupacionDTO | null>(null);

  error = signal<string | null>(null);
  cargando = signal<boolean>(false);

  primeraPlantaLibre = computed(() => this.plazasOcupacion()?.planta?.primera?.libres ?? 0);
  segundaPlantaLibre = computed(() => this.plazasOcupacion()?.planta?.segunda?.libres ?? 0);
  terceraPlantaLibre = computed(() => this.plazasOcupacion()?.planta?.tercera?.libres ?? 0);

  ngOnInit() {
    this.cargando.set(true)
    this.error.set(null)

    forkJoin({
      plazasOcupacion: this.plazaService.getPlazasOcupacion(),
      plazasTotales: this.plazaService.getPlazasTotales(),
      planta0Max: this.plazaService.getPlazasTotalesPorPlanta(0),
      plantaMenos1Max: this.plazaService.getPlazasTotalesPorPlanta(-1),
      plantaMenos2Max: this.plazaService.getPlazasTotalesPorPlanta(-2),
    }).subscribe({
      next: (datos) => {
        this.plazas.set(datos.plazasOcupacion.total.ocupadas)
        this.plazasMax.set(datos.plazasTotales)
        this.plazasOcupacion.set(datos.plazasOcupacion)
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
