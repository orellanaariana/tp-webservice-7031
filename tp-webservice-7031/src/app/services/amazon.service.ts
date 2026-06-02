import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmazonService {

  private apiUrl = 'https://amazon-scraper-api4.p.rapidapi.com';
  private apiKey = 'b8691ca599msh5d7f8103da85d37p18dce8jsnc1a8764558d1';
  private host = 'amazon-scraper-api4.p.rapidapi.com';

  constructor(private http: HttpClient) { }

  // 1) End-point: Search Products
  buscarProductos(texto: string): Observable<any> {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': this.host
    });

    // Se agrega el parámetro obligatorio languageCode=ES como pide el enunciado
    const params = new HttpParams()
      .set('query', texto) // Verifica si la API usa 'query' o 'searchTerm'
      .set('languageCode', 'ES'); 

    return this.http.get<any>(`${this.apiUrl}/products/search`, { headers, params });
  }

  // 2) End-point: Get Product Reviews
  obtenerResenas(asin: string): Observable<any> {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': this.host
    });

    const params = new HttpParams()
      .set('asin', asin)
      .set('languageCode', 'ES');

    return this.http.get<any>(`${this.apiUrl}/products/reviews`, { headers, params });
  }
}