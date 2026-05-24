import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversorService {
  
  // URL base de APILayer para Currency Data
  private apiUrl = 'https://api.apilayer.com/currency_data';
  
  private httpOptions = {
    headers: new HttpHeaders({
      'apikey': 't6Hx2K5gyPGfZHOvOLDFdjzQDqGJw0Sl' // ¡Pega aquí tu clave!
    })
  };

  constructor(private http: HttpClient) { }

  // Método que recibe quién convierte, a qué convierte y cuánto dinero
  convertir(from: string, to: string, amount: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/convert?to=${to}&from=${from}&amount=${amount}`, this.httpOptions);
  }
}