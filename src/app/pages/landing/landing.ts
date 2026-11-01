import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideCircleAlert, LucideArrowUpRight } from '@lucide/angular';

@Component({
  imports: [RouterLink, LucideCircleAlert, LucideArrowUpRight],
  selector: 'app-landing',
  standalone: true,
  styleUrl: './landing.css',
  templateUrl: './landing.html',
})
export class Landing implements OnInit {
  plazas = signal<number>(0)
  plazasMax = signal<number>(200)
  ocupado = signal<boolean>(false)
  plantas = signal<number>(3)

  ngOnInit() {
    setInterval(() => {
      this.plazas.update((e) => Math.min(e + 1, this.plazasMax()))
    }, 1000)
  }
}
