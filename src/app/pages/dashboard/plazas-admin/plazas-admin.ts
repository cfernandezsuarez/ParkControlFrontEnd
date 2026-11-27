import {Component, inject, OnInit, signal} from '@angular/core';
import {ConfirmModal} from '../../../components/confirm-modal/confirm-modal';
import {DatePipe} from '@angular/common';
import {EditarAbonadoModal} from '../../../components/editar-abonado-modal/editar-abonado-modal';
import {LucidePenLine, LucideTrash} from '@lucide/angular';
import {RegistroAbonado} from '../../../components/registro-abonado/registro-abonado';
import {PlazaService} from '../../../services/plazaService';
import { Plazas } from '../../../models/plazas';
import {HttpErrorResponse} from '@angular/common/http';
import { EstadoPlaza } from '../../../models/enums';

@Component({
  imports: [
    ConfirmModal,
    DatePipe,
    EditarAbonadoModal,
    LucidePenLine,
    LucideTrash,
    RegistroAbonado
  ],
  selector: 'app-plazas-admin',
  styleUrl: './plazas-admin.css',
  templateUrl: './plazas-admin.html',
})

export class PlazasAdmin implements OnInit {

  private plazaService = inject(PlazaService);
  protected readonly EstadoPlaza = EstadoPlaza;

  plazas = signal<Plazas[] | null>(null);
  totalElements = signal<number>(0);
  totalPages = signal<number>(0);
  page = signal<number>(0);
  size = 4;

  cargando = signal<boolean>(false);
  error = signal<string | null>(null);

  ngOnInit() {
    this.cargarPlazas()
  }

  cargarPlazas() {
    this.cargando.set(true);
    this.error.set(null);

    this.plazaService.getPlazas(this.page(), this.size).subscribe({
      next: (data) => {
        this.plazas.set(data.content);
        this.totalElements.set(data.totalElements);
        this.totalPages.set(data.totalPages);
        this.cargando.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set(err.error?.detail || 'Error al cargar las plazas');
        this.cargando.set(false);
      }
    });
  }

  anteriorPagina() {
    if (this.page() > 0) {
      this.page.set(this.page() - 1);
      this.cargarPlazas();
    }
  }

  siguientePagina() {
    if (this.page() < this.totalPages() - 1) {
      this.page.set(this.page() + 1);
      this.cargarPlazas();
    }
  }


}
