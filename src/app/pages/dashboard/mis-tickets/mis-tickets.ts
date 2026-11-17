import {Component, inject, OnInit, signal} from '@angular/core';
import {TicketService} from '../../../services/ticketService';
import {TicketDTO} from '../../../models/dto/ticketDto';
import {EstadoTicket} from '../../../models/enums';
import {DatePipe} from '@angular/common';

@Component({
  imports: [
    DatePipe
  ],
  selector: 'app-mis-tickets',
  styleUrl: './mis-tickets.css',
  templateUrl: './mis-tickets.html',
})
export class MisTickets implements OnInit {

  private ticketService = inject(TicketService);

  error = signal<string | null>(null);
  cargando = signal<boolean>(false);

  tickets = signal<TicketDTO[]>([]);
  totalElements = signal<number>(0);
  totalPages = signal<number>(0);
  page = signal<number>(0);
  size = 5;

  ngOnInit() {
    this.cargarTickets()
  }

  cargarTickets() {

    this.cargando.set(true)
    this.error.set(null)

    this.ticketService.getTickets(this.page(), this.size).subscribe({
      next: (page) => {
        this.tickets.set(page.content)
        this.totalElements.set(page.totalElements)
        this.totalPages.set(page.totalPages)
        this.cargando.set(false)
      },
      error: (err) => {
        this.error.set(err.message)
        this.cargando.set(false)
      }
    })

  }

  irAPagina(nuevaPagina: number) {
    if (nuevaPagina < 0 || nuevaPagina >= this.totalPages()) return
    this.page.set(nuevaPagina)
    this.cargarTickets()
  }

  siguientePagina() {
    this.irAPagina(this.page() + 1)
  }

  anteriorPagina() {
    this.irAPagina(this.page() - 1)
  }

  protected readonly EstadoTicket = EstadoTicket;
}
