import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Tarifa } from '../models/tarifa';

@Injectable({
  providedIn: 'root'
})

export class TarifaService {

  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl

  getTarifasVigentes(): Observable<Tarifa[]> {
    return this.http.get<Tarifa[]>(`${this.apiUrl}/tarifas/vigente`);
  }
}
