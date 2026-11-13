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

  tickets = signal<TicketDTO[]>([]);
  error = signal<string | null>(null);
  cargando = signal<boolean>(false);

  ngOnInit() {
    this.ticketService.getMisTickets().subscribe({
      next: (data) => {
        this.tickets.set(data)
      },
      error: (err) => {
        this.error.set(err.message)
      }
    })
  }

  protected readonly EstadoTicket = EstadoTicket;
}
