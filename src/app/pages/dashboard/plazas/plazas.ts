import { Component, inject, OnInit, signal } from '@angular/core';
import { PlazaDTO } from '../../../models/dto/plazasDto';
import { PlazaService } from '../../../services/plazaService';
import { EstadoPlaza, TipoPlaza } from '../../../models/enums';

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
    const plantaBd = this.plantaVistaBd(plantaVista);
    this.cargarPlazasDePlanta(plantaBd);
  }

  private plantaVistaBd(vista: number): number {
    if (vista === -1) return 0;
    if (vista === -2) return -1;
    if (vista === -3) return -2;
    return vista;
  }

  bloquearDesbloquear(id: number) {
    const plaza = this.plazasDeLaPlanta().find(p => p.id === id);
    if (!plaza || plaza.estado === EstadoPlaza.OCUPADA) return
    this.plazaService.cambiarEstadoPlaza(id).subscribe({
      next: () => {
        this.plazasDeLaPlanta.update((plazas) =>
          plazas.map((p) => {
            if (p.id === id) {
              const nuevoEstado = p.estado === EstadoPlaza.BLOQUEADA
                ? EstadoPlaza.LIBRE
                : EstadoPlaza.BLOQUEADA
              return { ...p, estado: nuevoEstado }
            }
            return p
          })
        );
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

  protected readonly EstadoPlaza = EstadoPlaza;
  protected readonly TipoPlaza = TipoPlaza;
}
