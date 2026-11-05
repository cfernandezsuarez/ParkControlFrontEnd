import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderDashboard } from '../../components/header-dashboard/header-dashboard';

@Component({
  imports: [RouterOutlet, HeaderDashboard],
  selector: 'app-private-layout',
  styleUrl: './private-layout.css',
  templateUrl: './private-layout.html',
})
export class PrivateLayout {}
