import { Component, EventEmitter, Input, inject, Output, signal, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { TarifaService } from '../../services/tarifaService';
import { Tarifa } from '../../models/tarifa';
@Component({
  imports: [FormsModule],
  selector: 'app-editar-tarifa-modal',
  styleUrl: './editar-tarifa-modal.css',
  templateUrl: './editar-tarifa-modal.html',
})
export class EditarTarifaModal implements OnChanges {

  private tarifaService = inject(TarifaService);

  @Input() tarifa!: Tarifa;
  @Output() cerrar = new EventEmitter<void>();
  @Output() tarifaActualizada = new EventEmitter<void>();

  nombre = '';
  topeMaximo = 0;
  fecha = '';
  minCortesia = 0;
  precio = 0;

  actualizando = signal<boolean>(false);
  error = signal<string | null>(null);

  ngOnChanges() {
    if (this.tarifa) {
      this.nombre = this.tarifa.nombre
      this.topeMaximo = this.tarifa.topeMaximo
      this.fecha = new Date(this.tarifa.fecha).toISOString().slice(0, 16)
      this.minCortesia = this.tarifa.minCortesia
      this.precio = this.tarifa.precio
    }
  }

  guardar() {
    if (!this.nombre || !this.topeMaximo || !this.fecha || !this.minCortesia || !this.precio) {
      this.error.set('Todos los campos son obligatorios')
      return;
    }

    this.actualizando.set(true);
    this.error.set(null);

    const request = {
      nombre: this.nombre,
      topeMaximo: this.topeMaximo,
      fecha: this.fecha,
      minCortesia: this.minCortesia,
      precio: this.precio
    }

    this.tarifaService.actualizarTarifa(this.tarifa.id, request).subscribe({
      next: () => {
        this.actualizando.set(false)
        this.tarifaActualizada.emit()
        this.cerrar.emit()
      },
      error: (err: HttpErrorResponse) => {
        this.actualizando.set(false)
        this.error.set(err.error?.detail || 'Error al actualizar la tarifa')
      }
    })
  }
}
