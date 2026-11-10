import { Injectable, inject } from '@angular/core';
import { PlazasOcupacionDTO, PlazaDTO } from '../models/dto/plazasDto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class PlazaService {

    private http = inject(HttpClient);

    private apiUrl = environment.apiUrl

    getPlazasTotales(): Observable<number> {
      return this.http.get<number>(`${this.apiUrl}/plazas/total`)
    }

    getPlazasBloqueadas(): Observable<number> {
      return this.http.get<number>(`${this.apiUrl}/plazas/total/bloqueada`)
    }

    getPlazasTotalesPorPlanta(planta: number): Observable<number> {
      const params = new HttpParams().set('planta', planta)
      return this.http.get<number>(`${this.apiUrl}/plazas/total/planta`, {params})
    }

    getPlazasOcupacion(): Observable<PlazasOcupacionDTO> {
      return this.http.get<PlazasOcupacionDTO>(`${this.apiUrl}/plazas/ocupacion`)
    }

    getPlazasPorPlanta(planta: number): Observable<PlazaDTO[]> {
      return this.http.get<PlazaDTO[]>(`${this.apiUrl}/plazas/planta/${planta}`);
    }

    cambiarEstadoPlaza(id: number): Observable<string> {
      return this.http.patch<string>(`${this.apiUrl}/plazas/${id}/estado`, {});
    }
}
