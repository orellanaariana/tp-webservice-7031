import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {

  // Reemplaza esto con la llave que copiaste en el Paso 1
  private apiKey = '7f1ca38181ec5d9a194ab5ace9ae5c30'; 
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) { }

  // Buscamos por nombre de ciudad, forzamos el idioma español y los grados Celsius (metric)
  obtenerClima(ciudad: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?q=${ciudad}&appid=${this.apiKey}&units=metric&lang=es`);
  }
}