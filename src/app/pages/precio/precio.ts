import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideClock3, LucideCarFront, LucideCalendarDays, LucideCircleAlert } from '@lucide/angular';

@Component({
  imports: [RouterLink, LucideClock3, LucideCarFront, LucideCalendarDays, LucideCircleAlert ],
  selector: 'app-precio',
  standalone: true,
  styleUrl: './precio.css',
  templateUrl: './precio.html',
})
export class Precio {}
