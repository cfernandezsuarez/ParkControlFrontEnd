import { Component, OnInit, signal, inject } from '@angular/core';
import {PlazaService} from '../../../services/plazaService';

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
  plazasBloqueadas = signal<number>(0);

  error = signal<string | null>(null);

  ngOnInit() {
    this.plazaService.getPlazasOcupadas().subscribe({
      next: (data) => {
        this.plazas.set(data)
      },
      error: () => {
        this.error.set('Error al obtener las plazas ocupadas');
      }
    })
    this.plazaService.getPlazasBloqueadas().subscribe({
      next: (data) => {
        this.plazasBloqueadas.set(data)
      },
      error: () => {
        this.error.set('Error al obtener las plazas bloqueadas');
      }
    })
    this.plazaService.getPlazasTotales().subscribe({
      next: (data) => {
        this.plazasMax.set(data)
      },
      error: () => {
        this.error.set('Error al obtener las plazas totales');
      }
    })
  }
}
