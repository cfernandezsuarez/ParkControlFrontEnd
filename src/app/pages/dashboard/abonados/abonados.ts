import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AbonadoService } from '../../../services/abonadoService';
import { AbonadoDTO } from '../../../models/dto/abonadoDto';
import { RegistroAbonado } from '../../../components/registro-abonado/registro-abonado';
import { LucidePenLine, LucideTrash } from '@lucide/angular';
import { EditarAbonadoModal } from '../../../components/editar-abonado-modal/editar-abonado-modal';
import { ConfirmModal } from '../../../components/confirm-modal/confirm-modal';

@Component({
  selector: 'app-abonados',
  standalone: true,
  imports: [FormsModule, DatePipe, RegistroAbonado, LucidePenLine, LucideTrash, EditarAbonadoModal, ConfirmModal],
  templateUrl: './abonados.html',
  styleUrl: './abonados.css'
})
export class Abonados implements OnInit {
  private abonadoService = inject(AbonadoService);

  abonados = signal<AbonadoDTO[]>([]);
  cargando = signal<boolean>(false);
  error = signal<string | null>(null);
  exito = signal<string | null>(null);

  mostrarModal = signal<boolean>(false);
  abonadoAEditar = signal<AbonadoDTO | null>(null);
  abonadoAEliminar = signal<AbonadoDTO | null>(null);

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

  abrirModal() {
    this.mostrarModal.set(true);
    this.error.set(null);
    this.exito.set(null);
  }

  cerrarModal() {
    this.mostrarModal.set(false);
  }

  onAbonadoCreado() {
    this.exito.set('Abonado creado correctamente');
    this.cargarAbonados();
  }

  estaVigente(abonado: AbonadoDTO): boolean {
    return new Date(abonado.fechaFin) > new Date();
  }

  abrirModalEditar(abonado: AbonadoDTO) {
    this.abonadoAEditar.set(abonado)
  }

  cerrarModalEditar() {
    this.abonadoAEditar.set(null)
  }

  onAbonadoActualizado() {
    this.exito.set('Abonado actualizado correctamente');
    this.cargarAbonados()
  }

  abrirModalEliminar(abonado: AbonadoDTO) {
    this.abonadoAEliminar.set(abonado)
  }

  cerrarModalEliminar() {
    this.abonadoAEliminar.set(null)
  }

  confirmarEliminar() {
    const abonado = this.abonadoAEliminar()
    if (!abonado) return;

    this.abonadoService.eliminarAbonado(abonado.id).subscribe({
      next: () => {
        this.exito.set('Abonado eliminado correctamente')
        this.abonadoAEliminar.set(null)
        this.cargarAbonados()
      },
      error: (err: HttpErrorResponse) => {
        this.error.set(err.error?.detail || 'Error al eliminar el abonado')
        this.abonadoAEliminar.set(null)
      }
    })
  }
}
