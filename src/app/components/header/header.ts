import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideArrowUpRight, LucideMenu } from '@lucide/angular';

@Component({
  imports: [RouterLink, RouterLinkActive, LucideArrowUpRight, LucideMenu],
  selector: 'app-header',
  standalone: true,
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  menu = signal<boolean>(false)

  openMenu() {
    this.menu.update(e => !e)
  }
}
