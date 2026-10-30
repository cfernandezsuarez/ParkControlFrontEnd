import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';

@Component({
  imports: [RouterLink, Header, Footer],
  selector: 'app-precio',
  standalone: true,
  styleUrl: './precio.css',
  templateUrl: './precio.html',
})
export class Precio {}
