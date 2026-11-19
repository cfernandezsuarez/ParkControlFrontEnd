import {Component, inject, OnInit, signal} from '@angular/core';
import { TarifaService } from '../../../services/tarifaService';
import {Tarifa} from '../../../models/tarifa';
import {DatePipe} from '@angular/common';

@Component({
  imports: [
    DatePipe
  ],
  selector: 'app-tarifa-admin',
  styleUrl: './tarifa-admin.css',
  templateUrl: './tarifa-admin.html',
})
export class TarifaAdmin implements OnInit {

  private tarifaService = inject(TarifaService);

  tarifas = signal<Tarifa[]>([]);

  cargando = signal<boolean>(false);
  error = signal<string>('');

  ngOnInit() {
    this.cargando.set(true)
    this.error.set('');

    this.tarifaService.getTarifasTotal().subscribe({
      next: data => {
        this.tarifas.set(data)
        this.cargando.set(false)
      },
      error: err => {
        this.error.set(err.message)
        this.cargando.set(false)
      }
    })
  }

}
