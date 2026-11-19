import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ImporteTicketDTO, TicketEntradaRequest, TicketPagadoDTO } from '../models/dto/ticketDto';
import { TicketDTO } from '../models/dto/ticketDto';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})

export class TicketService {

  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl

  registrarEntrada(datos: TicketEntradaRequest): Observable<string> {
    return this.http.post(`${this.apiUrl}/tickets/entrada`, datos, { responseType: 'text' });
  }

  getTickets(page: number = 0, size: number = 10, filtros?: any): Observable<Page<TicketDTO>> {
    let params  = new HttpParams().set('page', page).set('size', size);

    if (filtros?.estado) params = params.set('estado', filtros.estado);
    if (filtros?.precioMin) params = params.set('precioMin', filtros.precioMin);
    if (filtros?.precioMax) params = params.set('precioMax', filtros.precioMax);
    if (filtros?.minutosMin) params = params.set('minutosMin', filtros.minutosMin);
    if (filtros?.minutosMax) params = params.set('minutosMax', filtros.minutosMax);

    return this.http.get<Page<TicketDTO>>(`${this.apiUrl}/tickets`, { params });
  }

  getImporte(matricula: string): Observable<ImporteTicketDTO> {
    return this.http.get<ImporteTicketDTO>(`${this.apiUrl}/tickets/${matricula}/importe`);
  }

  pagar(datos: { matricula: string }): Observable<TicketPagadoDTO> {
    return this.http.post<TicketPagadoDTO>(`${this.apiUrl}/tickets/pagar`, datos);
  }
}
