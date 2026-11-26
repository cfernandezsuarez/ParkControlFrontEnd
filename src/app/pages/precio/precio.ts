import {Component, inject, OnInit, signal} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideClock3, LucideScanLine, LucideCarFront, LucideCalendarDays, LucideCircleAlert, LucideClock,
  LucideCreditCard, LucideArrowUpRight, LucideCheck
} from '@lucide/angular';
import { TarifaService } from '../../services/tarifaService';
import { Tarifa } from '../../models/tarifa';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  imports: [RouterLink, LucideArrowUpRight, LucideClock3, LucideScanLine, LucideCarFront, LucideCalendarDays, LucideCircleAlert, LucideClock, LucideCreditCard, LucideCheck],
  selector: 'app-precio',
  standalone: true,
  styleUrl: './precio.css',
  templateUrl: './precio.html',
})

export class Precio implements OnInit {

  private tarifaService = inject(TarifaService);

  tarifa = signal<Tarifa | null>(null);

  error = signal<string | null>(null);

  ngOnInit() {

    this.tarifaService.getTarifaVigente().subscribe({
      next: (data) => {
        this.tarifa.set(data)
      },
      error: (err: HttpErrorResponse) => {
        this.error.set(err.error?.detail)
      }
    })

  }

}
