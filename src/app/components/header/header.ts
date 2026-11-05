import {Component, inject, signal} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideArrowUpRight, LucideMenu } from '@lucide/angular';
import {AuthService} from '../../services/authService';

@Component({
  imports: [RouterLink, RouterLinkActive, LucideArrowUpRight, LucideMenu],
  selector: 'app-header',
  standalone: true,
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  protected auth = inject(AuthService)
  menu = signal<boolean>(false)

  openMenu() {
    this.menu.update(e => !e)
  }
}
