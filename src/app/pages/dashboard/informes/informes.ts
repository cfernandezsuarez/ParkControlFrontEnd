import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe, DecimalPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { InformeService } from '../../../services/informeService';
import { RecaudacionDiaDTO, OcupacionPlantaDTO } from '../../../models/dto/informeDto';

@Component({
  selector: 'app-informes',
  standalone: true,
  imports: [FormsModule, DatePipe, DecimalPipe],
  templateUrl: './informes.html',
  styleUrl: './informes.css'
})
export class Informes implements OnInit {

  private informeService = inject(InformeService);

  desde: string = new Date().toISOString().slice(0, 10);
  hasta: string = new Date().toISOString().slice(0, 10);
  recaudacion = signal<RecaudacionDiaDTO[]>([]);
  totalRecaudado = signal<number>(0);
  cargandoRecaudacion = signal<boolean>(false);
  errorRecaudacion = signal<string | null>(null);

  ocupacion = signal<OcupacionPlantaDTO[]>([]);
  cargandoOcupacion = signal<boolean>(false);
  errorOcupacion = signal<string | null>(null);

  ngOnInit() {
    this.cargarRecaudacion();
    this.cargarOcupacion();
  }

  cargarRecaudacion() {
    if (!this.desde || !this.hasta) {
      this.errorRecaudacion.set('Debes indicar las fechas de inicio y fin');
      return;
    }

    this.cargandoRecaudacion.set(true);
    this.errorRecaudacion.set(null);

    this.informeService.getRecaudacion(this.desde, this.hasta).subscribe({
      next: (data) => {
        this.recaudacion.set(data);
        const total = data.reduce((sum, r) => sum + r.importeTotal, 0);
        this.totalRecaudado.set(total);
        this.cargandoRecaudacion.set(false);
      },
      error: (err) => {
        this.cargandoRecaudacion.set(false);
        this.errorRecaudacion.set(err.error?.detail || 'Error al cargar la recaudación');
      }
    });
  }

  cargarOcupacion() {
    this.cargandoOcupacion.set(true);
    this.errorOcupacion.set(null);

    this.informeService.getOcupacion().subscribe({
      next: (data) => {
        this.ocupacion.set(data);
        this.cargandoOcupacion.set(false);
      },
      error: (err) => {
        this.cargandoOcupacion.set(false);
        this.errorOcupacion.set(err.message || 'Error al cargar la ocupación');
      }
    });
  }
}
