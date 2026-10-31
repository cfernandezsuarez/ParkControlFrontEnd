import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideCircleAlert } from '@lucide/angular';

@Component({
  imports: [RouterLink, LucideCircleAlert],
  selector: 'app-landing',
  standalone: true,
  styleUrl: './landing.css',
  templateUrl: './landing.html',
})
export class Landing {
  plazas = signal<number>(0)
  plazasMax = signal<number>(200)
  ocupado = signal<boolean>(false)
}
