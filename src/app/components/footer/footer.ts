import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-footer',
  standalone: true,
  styleUrl: './footer.css',
  templateUrl: './footer.html',
})
export class Footer {}
