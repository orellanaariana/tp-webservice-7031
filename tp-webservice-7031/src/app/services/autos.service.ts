import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutosService {
  
  // 1. LA URL BASE (Corta hasta la palabra cars o v2, dependiendo de la API)
  // Basándome en tu error, la ruta base correcta parece ser esta:
  private apiUrl = 'https://car-specs.p.rapidapi.com/v2/cars'; 
  
  private httpOptions = {
    headers: new HttpHeaders({
      'X-RapidAPI-Key': 'b998040188msh82022c7ccfca6cep15a594jsn6ab3d28e9e75', // ¡Recuerda mantener tu llave aquí!
      'X-RapidAPI-Host': 'car-specs.p.rapidapi.com'
    })
  };

  constructor(private http: HttpClient) { }

  // 2. OBTENER TODAS LAS MARCAS
  getMarcas(): Observable<any> {
    // Al sumarlo con la URL base, la petición irá a: /v2/cars/makes
    return this.http.get<any>(`${this.apiUrl}/makes`, this.httpOptions);
  }

  // 3. OBTENER MODELOS DE UNA MARCA
  // CORRECCIÓN: La API exige buscar mediante el id (makeId)
  getModelos(makeId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/makes/${makeId}/models`, this.httpOptions);
  }
}