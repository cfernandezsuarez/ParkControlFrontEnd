import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { TicketService } from '../../../services/ticketService';
import { TicketDTO } from '../../../models/dto/ticketDto';
import { EstadoTicket } from '../../../models/enums';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [DatePipe, FormsModule],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css'
})
export class Tickets implements OnInit {

  private ticketService = inject(TicketService);
  protected readonly EstadoTicket = EstadoTicket;

  tickets = signal<TicketDTO[]>([]);
  totalElements = signal<number>(0);
  totalPages = signal<number>(0);
  page = signal<number>(0);
  size = 5;

  cargando = signal<boolean>(false);
  error = signal<string | null>(null);

  filtroEstado = signal<EstadoTicket | null>(null);
  filtroPrecioMin = signal<number | null>(null);
  filtroPrecioMax = signal<number | null>(null);

  ngOnInit() {
    this.cargarTickets();
  }

  cargarTickets() {
    this.cargando.set(true);
    this.error.set(null);

    const filtros = {
      estado: this.filtroEstado() || undefined,
      precioMin: this.filtroPrecioMin() || undefined,
      precioMax: this.filtroPrecioMax() || undefined
    };

    this.ticketService.getTickets(this.page(), this.size, filtros).subscribe({
      next: (p) => {
        this.tickets.set(p.content);
        this.totalElements.set(p.totalElements);
        this.totalPages.set(p.totalPages);
        this.cargando.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.cargando.set(false);
      }
    });
  }

  aplicarFiltros() {
    this.page.set(0);
    this.cargarTickets();
  }

  limpiarFiltros() {
    this.filtroEstado.set(null);
    this.filtroPrecioMin.set(null);
    this.filtroPrecioMax.set(null);
    this.page.set(0);
    this.cargarTickets();
  }

  anteriorPagina() {
    if (this.page() > 0) {
      this.page.set(this.page() - 1);
      this.cargarTickets();
    }
  }

  siguientePagina() {
    if (this.page() < this.totalPages() - 1) {
      this.page.set(this.page() + 1);
      this.cargarTickets();
    }
  }
}
