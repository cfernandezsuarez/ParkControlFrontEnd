import {Component, signal, inject} from '@angular/core';
import {AuthService} from '../../services/authService';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { LucideLogOut, LucideMenu } from '@lucide/angular';

@Component({
  imports: [RouterLink, RouterLinkActive, RouterOutlet, LucideLogOut, LucideMenu],
  selector: 'app-dashboard',
  standalone: true,
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {

  menuAbierto = signal<boolean>(false);

  toggleMenu() {
    this.menuAbierto.update(v => !v);
  }

  cerrarMenu() {
    this.menuAbierto.set(false);
  }

  protected auth = inject(AuthService);
}
