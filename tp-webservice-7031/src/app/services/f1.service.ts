import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class F1Service {

  private apiUrl = 'https://f1-live-motorsport-data.p.rapidapi.com';
  
  private httpOptions = {
    headers: new HttpHeaders({
      'X-RapidAPI-Key': 'b998040188msh82022c7ccfca6cep15a594jsn6ab3d28e9e75',
      'X-RapidAPI-Host': 'f1-live-motorsport-data.p.rapidapi.com'
    })
  };

  constructor(private http: HttpClient) { }

  // 1. Obtener carreras por año
  getCarreras(anio: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/races/${anio}`, this.httpOptions);
  }

  // 2. Obtener posiciones de una sesión específica
  getPosicionesSesion(sessionId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/session/${sessionId}`, this.httpOptions);
  }

  // 3. Obtener clasificación de constructores por año
  getConstructores(anio: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/constructor-standing/${anio}`, this.httpOptions);
  }
}