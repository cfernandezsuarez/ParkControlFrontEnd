import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Abonado } from '../models/abonado';
import {AbonadoDTO, CrearAbonadoRequest} from '../models/dto/abonadoDto';

@Injectable({
  providedIn: 'root'
})

export class AbonadoService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getAbonados(): Observable<Abonado[]> {
    return this.http.get<Abonado[]>(`${this.apiUrl}/abonados`);
  }

  crearAbonado(datos: CrearAbonadoRequest): Observable<AbonadoDTO> {
    return this.http.post<AbonadoDTO>(`${this.apiUrl}/abonados`, datos);
  }

}
