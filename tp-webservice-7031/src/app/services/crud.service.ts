import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Nota {
  id?: number;
  title: string;
  body: string;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  // 1. READ (GET) - Obtener los datos
  obtenerNotas(): Observable<Nota[]> {
    // Limitamos a 5 notas para que no sature la pantalla
    return this.http.get<Nota[]>(`${this.apiUrl}?_limit=5`);
  }

  // 2. CREATE (POST) - Enviar un nuevo registro
  crearNota(nota: Nota): Observable<Nota> {
    return this.http.post<Nota>(this.apiUrl, nota);
  }

  // 3. UPDATE (PUT) - Modificar un registro existente
  actualizarNota(id: number, nota: Nota): Observable<Nota> {
    return this.http.put<Nota>(`${this.apiUrl}/${id}`, nota);
  }

  // 4. DELETE (DELETE) - Borrar un registro
  borrarNota(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}