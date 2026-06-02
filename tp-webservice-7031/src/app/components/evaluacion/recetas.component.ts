import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecetasService } from '../../services/recetas.service';
import { TraductorService } from '../../services/traductor.service';

@Component({
  selector: 'app-recetas',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})
export class RecetasComponent {

  textoBusqueda: string = '';
  listaRecetas: any[] = [];
  cargandoRecetas: boolean = false;

  // Variables para la traducción en el modal
  recetaSeleccionada: any = null;
  descripcionTraducida: string = '';
  cargandoTraduccion: boolean = false;

  constructor(
    private recetasService: RecetasService,
    private traductorService: TraductorService
  ) {}

  // Acción del botón "BUSCAR"
  buscar(): void {
    if (!this.textoBusqueda.trim()) return;
    
    this.cargandoRecetas = true;
    this.recetasService.buscarRecetas(this.textoBusqueda).subscribe({
      next: (data) => {
        // Dependiendo de la API, a veces viene directo o dentro de un array/objeto
        this.listaRecetas = data.results || data; 
        this.cargandoRecetas = false;
      },
      error: (err) => {
        console.error('Error al buscar recetas', err);
        this.cargandoRecetas = false;
      }
    });
  }

  // Acción al hacer clic en "TRADUCIR"
  abrirYTraducir(receta: any): void {
    this.recetaSeleccionada = receta;
    this.descripcionTraducida = '';
    this.cargandoTraduccion = true;

    this.traductorService.traducirTexto(receta.description).subscribe({
      next: (res) => {
        // Estructura de respuesta estándar de Deep Translate: res.data.translations.translatedText
        if (res?.data?.translations?.translatedText) {
          this.descripcionTraducida = res.data.translations.translatedText;
        } else if (res?.translatedText) {
          this.descripcionTraducida = res.translatedText;
        } else {
          this.descripcionTraducida = "No se pudo formatear la traducción.";
        }
        this.cargandoTraduccion = false;
      },
      error: (err) => {
        console.error('Error en la traducción', err);
        this.descripcionTraducida = 'Error al conectar con el servicio de traducción.';
        this.cargandoTraduccion = false;
      }
    });
  }
}