import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutosService {
  // ATENCIÓN: Revisa en RapidAPI si la URL base es exactamente esta
  private apiUrl = 'https://car-specs.p.rapidapi.com/v2/cars/makes/%7BmakeId%7D/models'; 
  
  private httpOptions = {
    headers: new HttpHeaders({
      'X-RapidAPI-Key': 'b998040188msh82022c7ccfca6cep15a594jsn6ab3d28e9e75', // Pega tu llave de RapidAPI
      'X-RapidAPI-Host': 'car-specs.p.rapidapi.com' // Verifica este host en la página de RapidAPI
    })
  };

  constructor(private http: HttpClient) { }

  // 1. Obtener todas las marcas
  getMarcas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/makes`, this.httpOptions);
  }

  // 2. Obtener modelos según la marca elegida
  getModelos(marca: string): Observable<any> {
    // La URL exacta depende de la documentación de la API, suele ser así:
    return this.http.get<any>(`${this.apiUrl}/models?make=${marca}`, this.httpOptions);
  }
}