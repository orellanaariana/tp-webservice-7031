import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LugaresService {

  private apiUrl = 'https://local-business-data.p.rapidapi.com';
  private apiKey = 'b8691ca599msh5d7f8103da85d37p18dce8jsnc1a8764558d1';
  private host = 'local-business-data.p.rapidapi.com';

  constructor(private http: HttpClient) { }

  // 1) End-point: Bulk Search (Petición POST con el JSON exacto del enunciado)
  buscarLugares(textoBusqueda: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': this.host
    });

    // Armamos el JSON exactamente como pide la nota
    const body = {
      queries: [textoBusqueda],
      limit: 10,
      region: "ar",
      language: "es"
    };

    return this.http.post<any>(`${this.apiUrl}/search`, body, { headers });
  }

  // 2) End-point: Business Details (Petición GET para las fotos)
  obtenerDetallesNegocio(businessId: string): Observable<any> {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': this.host
    });

    // Generalmente este endpoint pide el ID del negocio por Query Params
    const params = new HttpParams().set('business_id', businessId);

    return this.http.get<any>(`${this.apiUrl}/business-details`, { headers, params });
  }
}