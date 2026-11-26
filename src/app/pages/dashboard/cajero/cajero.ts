import { Component, inject, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { TicketService } from '../../../services/ticketService';
import { ImporteTicketDTO } from '../../../models/dto/ticketDto';
import { LucideSearch, LucideCreditCard } from '@lucide/angular';

@Component({
  selector: 'app-cajero',
  standalone: true,
  imports: [FormsModule, LucideSearch, LucideCreditCard],
  templateUrl: './cajero.html',
  styleUrl: './cajero.css'
})

export class Cajero implements OnDestroy {

  private ticketService = inject(TicketService);

  matricula = '';
  importe = signal<ImporteTicketDTO | null>(null);
  cargando = signal<boolean>(false);
  error = signal<string | null>(null);
  cobrando = signal<boolean>(false);
  exito = signal<string | null>(null);

  private intervaloId: any = null;

  ngOnDestroy() {
    this.detenerIntervalo();
  }

  consultarImporte() {
    if (!this.matricula.trim()) {
      this.error.set('La matrícula es obligatoria')
      return;
    }

    this.detenerIntervalo();

    this.cargando.set(true)
    this.error.set(null)
    this.importe.set(null)
    this.exito.set(null)

    this.ticketService.getImporte(this.matricula).subscribe({
      next: (data) => {
        this.importe.set(data)
        this.cargando.set(false)
        this.iniciarIntervalo()
      },
      error: (err: HttpErrorResponse) => {
        this.cargando.set(false)
        this.error.set(err.error?.detail || 'Error al consultar el importe')
      }
    })
  }

  cobrar() {
    const ticket = this.importe()
    if (!ticket || this.cobrando()) return;

    const matriculaTicket = ticket.matricula

    this.cobrando.set(true)
    this.error.set(null)
    this.exito.set(null)

    this.ticketService.pagar({ matricula: matriculaTicket }).subscribe({
      next: (respuesta) => {
        this.cobrando.set(false)
        this.exito.set(`Ticket cobrado: ${respuesta.importeFinal} €. Plaza ${respuesta.numeroPlaza} liberada.`)
        this.detenerIntervalo();
        this.importe.set(null)
        this.matricula = ''
      },
      error: (err: HttpErrorResponse) => {
        this.cobrando.set(false)
        this.error.set(err.error?.detail || 'Error al cobrar el ticket')
      }
    })
  }

  private iniciarIntervalo() {
    const matriculaActual = this.matricula
    this.intervaloId = setInterval(() => {
      this.ticketService.getImporte(matriculaActual).subscribe({
        next: (data) => {
          this.importe.set(data)
        },
        error: () => {
          this.detenerIntervalo()
        }
      })
    }, 10000)
  }

  private detenerIntervalo() {
    if (this.intervaloId !== null) {
      clearInterval(this.intervaloId)
      this.intervaloId = null
    }
  }
}
