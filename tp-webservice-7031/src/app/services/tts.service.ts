import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

  // Revisa la página de RapidAPI para confirmar si la URL termina en /tts, /speak o similar
  private apiUrl = 'https://open-ai-text-to-speech1.p.rapidapi.com/'; 

  constructor(private http: HttpClient) { }

  convertirTexto(texto: string, idioma: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': 'b998040188msh82022c7ccfca6cep15a594jsn6ab3d28e9e75',
      'X-RapidAPI-Host': 'open-ai-text-to-speech1.p.rapidapi.com',
      'Content-Type': 'application/json'
    });

    // Revisa en la documentación de RapidAPI cómo espera que se llame el parámetro del idioma. 
    // Usualmente es 'language', 'lang' o 'voice'.
    const body = {
        model: 'tts-1',
        input:texto,
        voice: idioma 
    };

    // ¡ESTA ES LA LÍNEA MÁGICA! 
    // responseType: 'blob' le dice a Angular que reciba el archivo de audio, no un JSON.
    return this.http.post(this.apiUrl, body, { 
      headers: headers, 
      responseType: 'blob' 
    });
  }
}