import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AmazonService } from '../../services/amazon.service'; // Ajusta tu ruta

@Component({
  selector: 'app-amazon',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './amazon.component.html',
  styleUrls: ['./amazon.component.css']
})
export class AmazonComponent {

  textoBusqueda: string = '';
  
  // Variables para Productos
  productos: any[] = [];
  cargandoProductos: boolean = false;

  // Variables para Detalles/Reseñas
  asinSeleccionado: string = '';
  resenasData: any = null;
  cargandoResenas: boolean = false;

  constructor(private amazonService: AmazonService) {}

  buscar(): void {
    if (!this.textoBusqueda.trim()) return;
    
    this.cargandoProductos = true;
    this.productos = [];

    this.amazonService.buscarProductos(this.textoBusqueda).subscribe({
      next: (data) => {
        console.log('Productos:', data);
        // Ajustamos la ruta del array según la respuesta de Yeisonpx
        this.productos = data.results || data.data || data; 
        this.cargandoProductos = false;
      },
      error: (err) => {
        console.error('Error al buscar productos', err);
        this.cargandoProductos = false;
      }
    });
  }

  // Se dispara al hacer click en el ASIN (Card Title)
  verDetalle(asin: string): void {
    this.asinSeleccionado = asin;
    this.cargandoResenas = true;
    this.resenasData = null;

    this.amazonService.obtenerResenas(asin).subscribe({
      next: (data) => {
        console.log('Reseñas obtenidas:', data);
        this.resenasData = data;
        this.cargandoResenas = false;
      },
      error: (err) => {
        console.error('Error al buscar reseñas', err);
        this.cargandoResenas = false;
      }
    });
  }
}