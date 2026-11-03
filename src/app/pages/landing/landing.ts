import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowUpRight, LucideCircleGauge, LucideBadgePercent, LucideLockKeyhole, LucideUserGroup } from '@lucide/angular';
import { PlazaService } from '../../services/plazaService';
import { TotalOcupacionPorPlantaDTO } from '../../models/dto/plazasDto';

@Component({
  imports: [RouterLink, LucideArrowUpRight, LucideCircleGauge, LucideBadgePercent, LucideLockKeyhole, LucideUserGroup],
  selector: 'app-landing',
  standalone: true,
  styleUrl: './landing.css',
  templateUrl: './landing.html',
})
export class Landing implements OnInit {

  private plazaService = inject(PlazaService);

  plazas = signal<number>(0);
  plazasMax = signal<number>(200);
  ocupado = signal<boolean>(false);
  plantas = signal<number>(3);
  ocupacionPorPlanta = signal<TotalOcupacionPorPlantaDTO | null>(null);

  primeraPlantaLibre = computed(() =>
    this.plazasMax() - (this.ocupacionPorPlanta()?.primera ?? 0)
  );

  segundaPlantaLibre = computed(() =>
    this.plazasMax() - (this.ocupacionPorPlanta()?.segunda ?? 0)
  );

  terceraPlantaLibre = computed(() =>
    this.plazasMax() - (this.ocupacionPorPlanta()?.tercera ?? 0)
  );

  ngOnInit() {
    this.plazaService.getPlazasOcupadas().subscribe({
      next: (data) => {
        this.plazas.set(data)
      },
      error: (error) => {
        console.error('Error al obtener las plazas ocupadas:', error);
      }
    })
    this.plazaService.getPlazasTotales().subscribe({
      next: (data) => {
        this.plazasMax.set(data)
      },
      error: (error) => {
        console.error('Error al obtener las plazas totales:', error);
      }
    })
    this.plazaService.getPlazasOcupadasPorPlanta().subscribe({
      next: (data) => {
        this.ocupacionPorPlanta.set(data);
      },
      error: (error) => {
        console.error('Error al obtener la ocupación por planta:', error);
      }
    })
  }
}
