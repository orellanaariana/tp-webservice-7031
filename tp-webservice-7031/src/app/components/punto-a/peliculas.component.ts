import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeliculasService } from '../../services/peliculas.service'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {
  // Arreglo donde guardaremos las películas que lleguen de la API
  peliculas: any[] = []; 

  // Inyectamos el servicio en el constructor
  constructor(private peliculasService: PeliculasService) {}

  // ngOnInit se ejecuta ni bien el componente carga en pantalla
  ngOnInit(): void {
    this.cargarPeliculas();
  }

  cargarPeliculas(): void {
    this.peliculasService.getTopPeliculas().subscribe({
      next: (data) => {
        // Asignamos la respuesta a nuestra variable. 
        // Nota: Dependiendo de cómo devuelva los datos la API, a veces es "data" directo, o "data.movies", etc.
        this.peliculas = data; 
      },
      error: (error) => {
        console.error('Ocurrió un error al cargar las películas:', error);
      }
    });
  }
}