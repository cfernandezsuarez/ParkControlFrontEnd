import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RecaudacionDiaDTO, OcupacionPlantaDTO } from '../models/dto/informeDto';

@Injectable({
  providedIn: 'root'
})

export class InformeService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getRecaudacion(desde: string, hasta: string): Observable<RecaudacionDiaDTO[]> {
    const params = new HttpParams()
      .set('desde', desde)
      .set('hasta', hasta);
    return this.http.get<RecaudacionDiaDTO[]>(`${this.apiUrl}/informes/recaudacion`, { params });
  }

  getOcupacion(): Observable<OcupacionPlantaDTO[]> {
    return this.http.get<OcupacionPlantaDTO[]>(`${this.apiUrl}/informes/ocupacion`);
  }
}
