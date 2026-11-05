import {Component, inject} from '@angular/core';
import {AuthService} from '../../services/authService';
import {RouterLink} from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-header-dashboard',
  styleUrl: './header-dashboard.css',
  templateUrl: './header-dashboard.html',
})
export class HeaderDashboard {
  protected auth = inject(AuthService)
}
