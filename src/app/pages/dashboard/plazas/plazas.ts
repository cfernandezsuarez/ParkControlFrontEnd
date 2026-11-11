import { Component, inject, OnInit, signal } from '@angular/core';
import { PlazaDTO } from '../../../models/dto/plazasDto';
import { PlazaService } from '../../../services/plazaService';

@Component({
  imports: [],
  selector: 'app-plazas',
  styleUrl: './plazas.css',
  templateUrl: './plazas.html',
})
export class Plazas implements OnInit {

  private plazaService = inject(PlazaService);

  error = signal<string | null>(null);
  cargando = signal<boolean>(false);

  plantaSeleccionada = signal<number>(-1);
  plazasDeLaPlanta = signal<PlazaDTO[]>([]);

  ngOnInit() {
    this.cargarPlazasDePlanta(0);
  }

  cambiarPlanta(plantaVista: number) {
    this.plantaSeleccionada.set(plantaVista);
    const plantaBd = this.plantaVistaABd(plantaVista);
    this.cargarPlazasDePlanta(plantaBd);
  }

  private plantaVistaABd(vista: number): number {
    if (vista === -1) return 0;
    if (vista === -2) return -1;
    if (vista === -3) return -2;
    return vista;
  }

  bloquearDesbloquear(id: number) {
    this.plazaService.cambiarEstadoPlaza(id).subscribe({
      next: (mensaje) => {
        this.plazasDeLaPlanta.update((plazas) =>
          plazas.map((plaza) => {
            if (plaza.id === id && plaza.estado !== 'OCUPADA') {
              const nuevoEstado = plaza.estado === 'BLOQUEADA' ? 'LIBRE' : 'BLOQUEADA';
              return { ...plaza, estado: nuevoEstado };
            }
            return plaza;
          }),
        )
      },
      error: () => {
        this.error.set('Error al cambiar el estado de la plaza');
      }
    });
  }

  private cargarPlazasDePlanta(planta: number) {
    this.cargando.set(true);
    this.plazaService.getPlazasPorPlanta(planta).subscribe({
      next: (plazas) => {
        this.plazasDeLaPlanta.set(plazas);
        this.cargando.set(false);
      },
      error: () => {
        this.cargando.set(false);
        this.error.set('Error al cargar las plazas de la planta');
      }
    });
  }
}
