import { Component, inject, OnInit, signal } from '@angular/core';
import { LucideCheck, LucideTicket } from '@lucide/angular';
import { TipoPlaza } from '../../../models/enums';
import { FormsModule } from '@angular/forms';
import { Tarifa } from '../../../models/tarifa';
import { TicketService } from '../../../services/ticketService';
import { TarifaService } from '../../../services/tarifaService';
import {TicketEntradaRequest} from '../../../models/dto/ticketDto';

@Component({
  imports: [LucideCheck, LucideTicket, FormsModule],
  selector: 'app-entrada',
  styleUrl: './entrada.css',
  templateUrl: './entrada.html',
})
export class Entrada implements OnInit {

  private ticketService = inject(TicketService);
  private tarifaService = inject(TarifaService);

  tarifaSeleccionada: number | null = null;
  matricula = signal<string>('');
  tipoPlazaSeleccionada = signal<string>('');
  tarifas: Tarifa[] = [];

  cargando = signal<boolean>(false);
  error = signal<string | null>(null);

  ngOnInit() {
    this.tarifaService.getTarifasVigentes().subscribe({
      next: (data) => {
        this.tarifas = data
      },
      error: (err) => {
        this.error.set(err)
      }
    })
  }

  registrarEntrada() {
    if (!this.matricula().trim()) {
      this.error.set('La matrícula es obligatoria');
      return;
    }

    const tipoPlaza: TipoPlaza = this.tipoPlazaSeleccionada() === 'NORMAL' ? TipoPlaza.NORMAL : this.tipoPlazaSeleccionada() === 'ELECTRICA' ? TipoPlaza.ELECTRICA : TipoPlaza.PMR;

    const request: TicketEntradaRequest = {
      matricula: this.matricula(),
      tipoPlaza
    };

    this.cargando.set(true);
    this.error.set(null);

    this.ticketService.registrarEntrada(request).subscribe({
      next: (mensaje) => {
        this.cargando.set(false);
        this.matricula.set('');
        this.tipoPlazaSeleccionada.set('');
      },
      error: (err) => {
        this.cargando.set(false);
        this.error.set(err.error || 'Error al registrar la entrada');
      }
    });
  }

}
