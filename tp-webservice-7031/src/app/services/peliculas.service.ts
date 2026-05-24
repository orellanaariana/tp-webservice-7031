import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  // ATENCIÓN: Esta es la URL del endpoint real de consumo, revisa tu panel de RapidAPI para confirmar la URL exacta.
  private apiUrl = 'https://imdb236.p.rapidapi.com/api/imdb/top250-movies'; // URL para obtener las 250 mejores películas  

  // Inyectamos el HttpClient
  constructor(private http: HttpClient) { }

  getTopPeliculas(): Observable<any> {
    // Configuración de las cabeceras de seguridad requeridas por RapidAPI
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': 'b998040188msh82022c7ccfca6cep15a594jsn6ab3d28e9e75', // ¡Reemplaza esto con la clave que te da RapidAPI!
      'X-RapidAPI-Host': 'imdb236.p.rapidapi.com'
    });

    // Realizamos la petición GET
    return this.http.get(this.apiUrl, { headers: headers });
  }
}