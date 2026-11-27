import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { PlazaService } from '../../services/plazaService';
import { TipoPlaza } from '../../models/enums';
import { CrearPlazaRequest } from '../../models/dto/plazasDto';

@Component({
  selector: 'app-registro-plaza',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro-plaza.html',
  styleUrl: './registro-plaza.css'
})
export class RegistroPlaza {
  private plazaService = inject(PlazaService);

  protected readonly tiposPlaza = Object.values(TipoPlaza);

  @Output() cerrar = new EventEmitter<void>();
  @Output() plazaCreada = new EventEmitter<void>();

  nuevoNumero = '';
  nuevoTipo: TipoPlaza = TipoPlaza.NORMAL;

  creando = signal<boolean>(false);
  error = signal<string | null>(null);

  crearPlaza() {
    if (!this.nuevoNumero.trim() || !this.nuevoTipo) {
      this.error.set('Todos los campos son obligatorios')
      return;
    }

    this.creando.set(true)
    this.error.set(null)

    const request: CrearPlazaRequest = {
      numero: this.nuevoNumero.trim().toUpperCase(),
      tipo: this.nuevoTipo
    };

    this.plazaService.crearPlaza(request).subscribe({
      next: () => {
        this.creando.set(false)
        this.plazaCreada.emit()
        this.cerrar.emit()
      },
      error: (err: HttpErrorResponse) => {
        this.creando.set(false)
        this.error.set(err.error?.detail || 'Error al crear la plaza')
      }
    })
  }
}
