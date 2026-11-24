import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Tarifa } from '../models/tarifa';
import { ActualizarTarifaDTO } from '../models/dto/tarifaDto';

@Injectable({
  providedIn: 'root'
})

export class TarifaService {

  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl

  getTarifaVigente(): Observable<Tarifa> {
    return this.http.get<Tarifa>(`${this.apiUrl}/tarifas/vigente`);
  }

  getTarifasTotal() :Observable<Tarifa[]> {
    return this.http.get<Tarifa[]>(`${this.apiUrl}/tarifas/total`);
  }

  eliminarTarifa(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/tarifas/${id}/eliminar`, { responseType: 'text' });
  }

  actualizarTarifa(id: number, datos: ActualizarTarifaDTO): Observable<Tarifa> {
    return this.http.patch<Tarifa>(`${this.apiUrl}/tarifas/${id}`, datos);
  }
}
