import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TicketEntradaRequest } from '../models/dto/ticketDto';
import { TicketDTO } from '../models/dto/ticketDto';

@Injectable({
  providedIn: 'root'
})

export class TicketService {

  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl

  registrarEntrada(datos: TicketEntradaRequest): Observable<string> {
    return this.http.post(`${this.apiUrl}/tickets/entrada`, datos, { responseType: 'text' });
  }

  getMisTickets(): Observable<TicketDTO[]> {
    return this.http.get<TicketDTO[]>(`${this.apiUrl}/tickets/mis-tickets`);
  }
}
