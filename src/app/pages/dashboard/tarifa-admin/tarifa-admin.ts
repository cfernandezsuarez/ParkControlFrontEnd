import { Component, inject, OnInit, signal } from '@angular/core';
import { TarifaService } from '../../../services/tarifaService';
import { Tarifa } from '../../../models/tarifa';
import { DatePipe } from '@angular/common';
import { LucidePenLine, LucideTrash } from '@lucide/angular';
import { ConfirmModal } from '../../../components/confirm-modal/confirm-modal';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  imports: [DatePipe, LucidePenLine, LucideTrash, ConfirmModal],
  selector: 'app-tarifa-admin',
  styleUrl: './tarifa-admin.css',
  templateUrl: './tarifa-admin.html',
})
export class TarifaAdmin implements OnInit {

  private tarifaService = inject(TarifaService);

  tarifas = signal<Tarifa[]>([]);
  cargando = signal<boolean>(false);
  error = signal<string>('');

  tarifaAEliminar = signal<Tarifa | null>(null);
  eliminando = signal<boolean>(false);

  ngOnInit() {
    this.cargarTarifas();
  }

  cargarTarifas() {
    this.cargando.set(true);
    this.error.set('');

    this.tarifaService.getTarifasTotal().subscribe({
      next: (data) => {
        this.tarifas.set(data);
        this.cargando.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set(err.error?.detail || 'Error al cargar las tarifas');
        this.cargando.set(false);
      }
    });
  }

  abrirModalEliminar(tarifa: Tarifa) {
    this.tarifaAEliminar.set(tarifa);
  }

  cancelarEliminar() {
    this.tarifaAEliminar.set(null);
  }

  confirmarEliminar() {
    const tarifa = this.tarifaAEliminar();
    if (!tarifa) return;

    this.eliminando.set(true);
    this.tarifaService.eliminarTarifa(tarifa.id).subscribe({
      next: () => {
        this.eliminando.set(false);
        this.tarifaAEliminar.set(null);
        this.cargarTarifas();
      },
      error: (err: HttpErrorResponse) => {
        this.eliminando.set(false);
        this.error.set(err.error?.detail || 'Error al eliminar la tarifa');
        this.tarifaAEliminar.set(null);
      }
    });
  }
}
