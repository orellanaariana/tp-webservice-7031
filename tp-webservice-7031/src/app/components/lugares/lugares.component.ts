import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LugaresService } from '../../services/lugares.service'; 

@Component({
  selector: 'app-lugares',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css']
})
export class LugaresComponent {

  textoBusqueda: string = 'hoteles en jujuy'; // Valor inicial del ejemplo
  
  // Variables de Búsqueda
  lugares: any[] = [];
  cargandoLugares: boolean = false;

  // Variables del Modal (Business Details)
  lugarSeleccionado: any = null;
  fotosLugar: any[] = [];
  cargandoFotos: boolean = false;

  constructor(private lugaresService: LugaresService) {}

  buscar(): void {
    if (!this.textoBusqueda.trim()) return;

    this.cargandoLugares = true;
    this.lugares = [];

    this.lugaresService.buscarLugares(this.textoBusqueda).subscribe({
      next: (data) => {
        // La API suele devolver la data dentro de un array 'data'
        this.lugares = data.data || data.results || data; 
        this.cargandoLugares = false;
      },
      error: (err) => {
        console.error('Error al buscar lugares', err);
        this.cargandoLugares = false;
      }
    });
  }

  // Se dispara al hacer clic en "MAS INFO"
  verDetalle(lugar: any): void {
    this.lugarSeleccionado = lugar;
    this.fotosLugar = [];
    this.cargandoFotos = true;

    // Usamos el ID del negocio (suele llamarse business_id, place_id o id)
    const id = lugar.business_id || lugar.place_id || lugar.id;

    this.lugaresService.obtenerDetallesNegocio(id).subscribe({
      next: (data) => {
        // Extraemos el array photo_sample como pide el enunciado
        const detalle = data.data || data;
        this.fotosLugar = detalle.photo_sample || [];
        this.cargandoFotos = false;
      },
      error: (err) => {
        console.error('Error al obtener detalles', err);
        this.cargandoFotos = false;
      }
    });
  }

  // Resolución teórica del Punto 3 (Crear link a Google Maps)
  abrirEnMapa(lat: number, lng: number): void {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, '_blank'); // Abre en una nueva pestaña
  }
}