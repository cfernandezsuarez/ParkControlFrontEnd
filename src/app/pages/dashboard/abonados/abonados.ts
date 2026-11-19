import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AbonadoService } from '../../../services/abonadoService';
import { AbonadoDTO } from '../../../models/dto/abonadoDto';

@Component({
  selector: 'app-abonados',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './abonados.html',
  styleUrl: './abonados.css'
})
export class Abonados implements OnInit {
  private abonadoService = inject(AbonadoService);

  abonados = signal<AbonadoDTO[]>([]);
  cargando = signal<boolean>(false);
  error = signal<string | null>(null);
  exito = signal<string | null>(null);

  nuevoEmail = '';
  nuevoNombre = '';
  nuevaMatricula = '';
  nuevaFechaInicio = new Date().toISOString().slice(0, 16);
  nuevaFechaFin = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().slice(0, 16);

  creando = signal<boolean>(false);

  ngOnInit() {
    this.cargarAbonados();
  }

  cargarAbonados() {
    this.cargando.set(true);
    this.error.set(null);
    this.abonadoService.getAbonados().subscribe({
      next: (data) => {
        this.abonados.set(data);
        this.cargando.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set(err.error?.detail || 'Error al cargar los abonados');
        this.cargando.set(false);
      }
    });
  }

  crearAbonado() {
    if (!this.nuevoEmail || !this.nuevoNombre || !this.nuevaMatricula || !this.nuevaFechaInicio || !this.nuevaFechaFin) {
      this.error.set('Todos los campos son obligatorios');
      return;
    }

    this.creando.set(true);
    this.error.set(null);
    this.exito.set(null);

    const request = {
      email: this.nuevoEmail,
      nombre: this.nuevoNombre,
      matricula: this.nuevaMatricula.toUpperCase(),
      fechaInicio: this.nuevaFechaInicio,
      fechaFin: this.nuevaFechaFin
    };

    this.abonadoService.crearAbonado(request).subscribe({
      next: (data) => {
        this.creando.set(false);
        this.exito.set(`Abonado ${data.nombre} creado correctamente`);
        this.limpiarFormulario();
        this.cargarAbonados(); // Recargar la lista
      },
      error: (err: HttpErrorResponse) => {
        this.creando.set(false);
        this.error.set(err.error?.detail || 'Error al crear el abonado');
      }
    });
  }

  estaVigente(abonado: AbonadoDTO): boolean {
    return new Date(abonado.fechaFin) > new Date();
  }

  limpiarFormulario() {
    this.nuevoEmail = '';
    this.nuevoNombre = '';
    this.nuevaMatricula = '';
    this.nuevaFechaInicio = new Date().toISOString().slice(0, 16);
    this.nuevaFechaFin = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().slice(0, 16);
  }
}
