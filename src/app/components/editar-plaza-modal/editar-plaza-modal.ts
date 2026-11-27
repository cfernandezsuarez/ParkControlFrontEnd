import { Component, EventEmitter, Input, Output, inject, signal, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { PlazaService } from '../../services/plazaService';
import { Plazas } from '../../models/plazas';
import { EstadoPlaza } from '../../models/enums';

@Component({
  selector: 'app-editar-plaza-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar-plaza-modal.html',
  styleUrl: './editar-plaza-modal.css',
})
export class EditarPlazaModal implements OnChanges {

  private plazaService = inject(PlazaService);

  protected readonly estadosPlaza = Object.values(EstadoPlaza);

  @Input() plaza!: Plazas;
  @Output() cerrar = new EventEmitter<void>();
  @Output() plazaActualizada = new EventEmitter<void>();

  numero = '';
  estado: EstadoPlaza = EstadoPlaza.LIBRE;

  actualizando = signal<boolean>(false);
  error = signal<string | null>(null);

  ngOnChanges() {
    if (this.plaza) {
      this.numero = String(this.plaza.numero);
      this.estado = this.plaza.estado;
    }
  }

  guardar() {
    if (!this.numero.trim() || !this.estado) {
      this.error.set('Todos los campos son obligatorios');
      return;
    }

    this.actualizando.set(true);
    this.error.set(null);

    this.plazaService.actualizarPlaza(this.plaza.id, {
      numero: this.numero.trim().toUpperCase(),
      estado: this.estado
    }).subscribe({
      next: () => {
        this.actualizando.set(false);
        this.plazaActualizada.emit();
        this.cerrar.emit();
      },
      error: (err: HttpErrorResponse) => {
        this.actualizando.set(false);
        this.error.set(err.error?.detail || 'Error al actualizar la plaza');
      }
    });
  }
}
