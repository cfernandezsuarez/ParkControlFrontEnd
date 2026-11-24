import { inject, Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Abonado } from '../models/abonado';
import { AbonadoDTO, ActualizarAbonadoDTO, CrearAbonadoRequest } from '../models/dto/abonadoDto';
import {Page} from '../models/page';

@Injectable({
  providedIn: 'root'
})

export class AbonadoService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getAbonados(page: number = 0, size: number = 10): Observable<Page<Abonado[]>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())

    return this.http.get<Page<Abonado[]>>(`${this.apiUrl}/abonados`, { params });
  }

  crearAbonado(datos: CrearAbonadoRequest): Observable<string> {
    return this.http.post(`${this.apiUrl}/abonados`, datos, { responseType: 'text' });
  }

  actualizarAbonado(id: number, datos: ActualizarAbonadoDTO): Observable<AbonadoDTO> {
    return this.http.patch<AbonadoDTO>(`${this.apiUrl}/abonados/${id}`, datos);
  }

  eliminarAbonado(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/abonados/${id}`, { responseType: 'text' });
  }

}
