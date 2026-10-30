import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideCircleAlert } from '@lucide/angular';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';

@Component({
  imports: [RouterLink, Header, Footer, LucideCircleAlert],
  selector: 'app-landing',
  standalone: true,
  styleUrl: './landing.css',
  templateUrl: './landing.html',
})
export class Landing {}
