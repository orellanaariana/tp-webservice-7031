import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {

  // Probamos apuntando directamente a /search
  private apiUrl = 'https://low-carb-recipes.p.rapidapi.com/search'; 

  private headers = new HttpHeaders({
    'X-RapidAPI-Key': 'b8691ca599msh5d7f8103da85d37p18dce8jsnc1a8764558d1',
    'X-RapidAPI-Host': 'low-carb-recipes.p.rapidapi.com'
  });

  constructor(private http: HttpClient) { }

  buscarRecetas(nombre: string): Observable<any> {
    const params = new HttpParams().set('name', nombre);
    return this.http.get<any>(this.apiUrl, { headers: this.headers, params });
  }
}