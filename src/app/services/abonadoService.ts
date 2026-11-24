import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Abonado } from '../models/abonado';
import { AbonadoDTO, ActualizarAbonadoDTO, CrearAbonadoRequest } from '../models/dto/abonadoDto';

@Injectable({
  providedIn: 'root'
})

export class AbonadoService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getAbonados(): Observable<Abonado[]> {
    return this.http.get<Abonado[]>(`${this.apiUrl}/abonados`);
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
