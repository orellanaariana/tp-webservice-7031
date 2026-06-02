import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  // URL base para la búsqueda en la API de Snowflake107
  private apiUrl = 'https://simple-youtube-search.p.rapidapi.com/search';
  
  // Coloca aquí tu clave personal de RapidAPI
  private apiKey = 'b8691ca599msh5d7f8103da85d37p18dce8jsnc1a8764558d1';

  constructor(private http: HttpClient) { }

  buscarVideos(textoBusqueda: string): Observable<any> {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': 'simple-youtube-search.p.rapidapi.com'
    });

    // Pasamos el texto por Query Params. 
    // Nota: El parámetro suele llamarse 'query' o 'q' según el diseño exacto de la API.
    const params = new HttpParams().set('query', textoBusqueda);

    return this.http.get<any>(this.apiUrl, { headers, params });
  }
}