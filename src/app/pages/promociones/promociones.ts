import {Component, signal} from '@angular/core';
import {
  LucideBadgePercent,
  LucideClapperboard,
  LucideCheck,
  LucideDumbbell,
  LucideCircleAlert,
  LucideArrowUpRight
} from '@lucide/angular';
import {RouterModule} from '@angular/router';

@Component({
  imports: [LucideBadgePercent, RouterModule, LucideClapperboard, LucideCheck, LucideDumbbell, LucideCircleAlert, LucideArrowUpRight],
  selector: 'app-promociones',
  styleUrl: './promociones.css',
  templateUrl: './promociones.html',
})
export class Promociones {

  cargando = signal<boolean>(false);

}
