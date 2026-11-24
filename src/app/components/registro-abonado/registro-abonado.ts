import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AbonadoService } from '../../services/abonadoService';

@Component({
  selector: 'app-registro-abonado',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro-abonado.html',
  styleUrl: './registro-abonado.css'
})
export class RegistroAbonado {
  private abonadoService = inject(AbonadoService);

  @Output() cerrar = new EventEmitter<void>();
  @Output() abonadoCreado = new EventEmitter<void>();

  nuevoEmail = '';
  nuevoNombre = '';
  nuevaMatricula = '';
  nuevaFechaInicio = new Date().toISOString().slice(0, 16);
  nuevaFechaFin = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().slice(0, 16);

  creando = signal<boolean>(false);
  error = signal<string | null>(null);

  crearAbonado() {
    if (!this.nuevoEmail || !this.nuevoNombre || !this.nuevaMatricula || !this.nuevaFechaInicio || !this.nuevaFechaFin) {
      this.error.set('Todos los campos son obligatorios')
      return;
    }

    this.creando.set(true)
    this.error.set(null)

    const request = {
      email: this.nuevoEmail,
      nombre: this.nuevoNombre,
      matricula: this.nuevaMatricula.toUpperCase(),
      fechaInicio: this.nuevaFechaInicio,
      fechaFin: this.nuevaFechaFin
    }

    this.abonadoService.crearAbonado(request).subscribe({
      next: () => {
        this.creando.set(false)
        this.abonadoCreado.emit()
        this.cerrar.emit()
      },
      error: (err: HttpErrorResponse) => {
        this.creando.set(false)
        this.error.set(err.error?.detail || 'Error al crear el abonado')
      }
    })
  }
}
