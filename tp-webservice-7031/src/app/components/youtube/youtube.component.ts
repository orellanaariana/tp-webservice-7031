import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { YoutubeService } from '../../services/youtube.service'; // Ajusta la ruta a tu proyecto

@Component({
  selector: 'app-youtube',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent {

  searchQuery: string = 'Maradona'; // Valor inicial de prueba según el boceto
  listaVideos: any[] = [];
  cargando: boolean = false;
  
  // Propiedad para el PUNTO OPCIONAL (Detalle del video elegido)
  videoSeleccionado: any = null;

  constructor(private youtubeService: YoutubeService) {}

  buscar(): void {
    if (!this.searchQuery.trim()) return;

    this.cargando = true;
    this.listaVideos = [];
    this.videoSeleccionado = null; // Limpiamos selección previa

    this.youtubeService.buscarVideos(this.searchQuery).subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data); // 💡 Tip de examen: mira la consola para verificar las propiedades exactas
        
        // Dependiendo de cómo devuelva el JSON esta API (array directo o envuelto en .results / .items)
        this.listaVideos = data.results || data.items || data;
        
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al consumir el WS de YouTube', err);
        this.cargando = false;
      }
    });
  }

  // Método para el PUNTO OPCIONAL
  seleccionarVideo(video: any): void {
    this.videoSeleccionado = video;
  }
}