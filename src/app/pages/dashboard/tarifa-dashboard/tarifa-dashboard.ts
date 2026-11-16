import {Component, inject, OnInit, signal} from '@angular/core';
import {TarifaService} from '../../../services/tarifaService';
import { Tarifa } from '../../../models/tarifa';
import {DatePipe} from '@angular/common';

@Component({
  imports: [DatePipe],
  selector: 'app-tarifa-dashboard',
  styleUrl: './tarifa-dashboard.css',
  templateUrl: './tarifa-dashboard.html',
})
export class TarifaDashboard implements OnInit {

  tarifaService = inject(TarifaService);

  cargando = signal<boolean>(false);
  tarifa = signal<Tarifa | null>(null);
  error = signal<string | null>(null);

  ngOnInit() {

    this.cargando.set(true);
    this.error.set(null);

    this.tarifaService.getTarifaVigente().subscribe({
      next: (data) => {
        this.cargando.set(false)
        this.tarifa.set(data)
      },
      error: (err) => {
        this.cargando.set(false)
        this.error.set(err.message)
      }
    })
  }

}
