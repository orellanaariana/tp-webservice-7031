import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextToSpeechService } from '../../services/tts.service'; // Ajusta tu ruta
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'; // Para seguridad de URLs

@Component({
  selector: 'app-tts',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tts.component.html',
  styleUrls: ['./tts.component.css']
})
export class TtsComponent {

  textoIngresado: string = '';
  idiomaSeleccionado: string = 'alloy'; // Voz por defecto
  
  cargando: boolean = false;
  audioGeneradoUrl: SafeUrl | null = null; // Guardará la URL segura del audio

  constructor(
    private ttsService: TextToSpeechService,
    private sanitizer: DomSanitizer // Inyectamos el sanitizador de Angular
  ) {}

  generarAudio(): void {
    if (!this.textoIngresado.trim()) return;

    this.cargando = true;
    this.audioGeneradoUrl = null; // Limpiamos el audio anterior

    this.ttsService.convertirTexto(this.textoIngresado, this.idiomaSeleccionado).subscribe({
      next: (blob: Blob) => {
        // 1. Convertimos el archivo binario (Blob) en una URL local del navegador
        const urlPura = URL.createObjectURL(blob);
        
        // 2. Le decimos a Angular que confíe en esta URL para que no la bloquee
        this.audioGeneradoUrl = this.sanitizer.bypassSecurityTrustUrl(urlPura);
        
        this.cargando = false;
        console.log('Audio generado con éxito');
      },
      error: (err) => {
        this.cargando = false;
        
        // Si el error es un Blob (archivo binario), lo leemos como texto
        if (err.error instanceof Blob) {
          err.error.text().then((textoError: string) => {
            console.error('Detalle exacto del rechazo de la API:', textoError);
          });
        } else {
          console.error('Error general al generar el audio:', err);
        }
      }
    });
  }
}