import { Injectable, inject } from '@angular/core';
import { TotalPlazasOcupadasDTO, TotalOcupacionPorPlantaDTO } from '../models/dto/plazasDto';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
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

    getPlazasOcupadas(): Observable<number> {
        return this.http.get<TotalPlazasOcupadasDTO[]>(`${this.apiUrl}/plazas/ocupadas/total`).pipe(
            map((data) => data[0]?.total || 0)
        )
    }

    getPlazasOcupadasPorPlanta(): Observable<TotalOcupacionPorPlantaDTO> {
        return this.http.get<TotalOcupacionPorPlantaDTO>(`${this.apiUrl}/plazas/ocupadas/planta`)
    }

}