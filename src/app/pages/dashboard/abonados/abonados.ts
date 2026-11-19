import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AbonadoService } from '../../../services/abonadoService';
import { AbonadoDTO } from '../../../models/dto/abonadoDto';
import { RegistroAbonado } from '../../../components/registro-abonado/registro-abonado';

@Component({
  selector: 'app-abonados',
  standalone: true,
  imports: [FormsModule, DatePipe, RegistroAbonado],  // <-- Añadir RegistroAbonado
  templateUrl: './abonados.html',
  styleUrl: './abonados.css'
})
export class Abonados implements OnInit {
  private abonadoService = inject(AbonadoService);

  abonados = signal<AbonadoDTO[]>([]);
  cargando = signal<boolean>(false);
  error = signal<string | null>(null);
  exito = signal<string | null>(null);

  mostrarModal = signal<boolean>(false);  // <-- Signal para el modal

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
}
