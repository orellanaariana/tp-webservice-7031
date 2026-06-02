import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TraductorService {

  private apiUrl = 'https://deep-translate1.p.rapidapi.com/language/translate/v2';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': 'b8691ca599msh5d7f8103da85d37p18dce8jsnc1a8764558d1',
    'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
  });

  constructor(private http: HttpClient) { }

  // 2) Endpoint translate: Traducir del inglés al español
  traducirTexto(texto: string): Observable<any> {
    const body = {
      q: texto,
      source: 'en',
      target: 'es'
    };
    return this.http.post<any>(this.apiUrl, body, { headers: this.headers });
  }
}