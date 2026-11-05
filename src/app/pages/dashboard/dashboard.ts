import {Component, inject} from '@angular/core';
import {AuthService} from '../../services/authService';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { LucideLogOut } from '@lucide/angular';

@Component({
  imports: [RouterLink, RouterLinkActive, RouterOutlet, LucideLogOut],
  selector: 'app-dashboard',
  standalone: true,
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  protected auth = inject(AuthService);
}
