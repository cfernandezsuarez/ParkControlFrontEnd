import { Component, EventEmitter, Input, Output, inject, signal, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AbonadoService } from '../../services/abonadoService';
import { AbonadoDTO } from '../../models/dto/abonadoDto';

@Component({
  imports: [FormsModule],
  selector: 'app-editar-abonado-modal',
  styleUrl: './editar-abonado-modal.css',
  templateUrl: './editar-abonado-modal.html',
})

export class EditarAbonadoModal implements OnChanges {

  private abonadoService = inject(AbonadoService);

  @Input() abonado!: AbonadoDTO;
  @Output() cerrar = new EventEmitter<void>();
  @Output() abonadoActualizado = new EventEmitter<void>();

  email = '';
  nombre = '';
  matricula = '';
  fechaInicio = '';
  fechaFin = '';

  actualizando = signal<boolean>(false);
  error = signal<string | null>(null);

  ngOnChanges() {
    if (this.abonado) {
      this.email = this.abonado.email
      this.nombre = this.abonado.nombre
      this.matricula = this.abonado.matricula
      this.fechaInicio = new Date(this.abonado.fechaInicio).toISOString().slice(0, 16)
      this.fechaFin = new Date(this.abonado.fechaFin).toISOString().slice(0, 16)
    }
  }

  guardar() {
    if (!this.email || !this.nombre || !this.matricula || !this.fechaInicio || !this.fechaFin) {
      this.error.set('Todos los campos son obligatorios')
      return;
    }

    this.actualizando.set(true)
    this.error.set(null)

    this.abonadoService.actualizarAbonado(this.abonado.id, {
      email: this.email,
      nombre: this.nombre,
      matricula: this.matricula.toUpperCase(),
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin
    }).subscribe({
      next: () => {
        this.actualizando.set(false)
        this.abonadoActualizado.emit()
        this.cerrar.emit()
      },
      error: (err: HttpErrorResponse) => {
        this.actualizando.set(false)
        this.error.set(err.error?.detail || 'Error al actualizar el abonado')
      }
    })
  }
}
