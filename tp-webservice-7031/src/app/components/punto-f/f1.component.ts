import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { F1Service } from '../../services/f1.service'; // Ajusta tu ruta

@Component({
  selector: 'app-f1',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './f1.component.html',
  styleUrls: ['./f1.component.css']
})
export class F1Component {

  anioBuscado: number = 2024; // Año por defecto para testear [cite: 12]
  
  // Variables para la tabla de carreras
  carreras: any[] = [];
  cargandoCarreras: boolean = false;

  // Variables para el modal de sesiones
  pilotosSesion: any[] = [];
  cargandoPilotos: boolean = false;
  nombreSesionActual: string = '';

  // Variables para constructores
  constructoresFiltrados: any[] = [];
  cargandoConstructores: boolean = false;

  constructor(private f1Service: F1Service) {}

  // Consumir el webservice "Races" [cite: 4]
  consultarCarreras(): void {
    if (!this.anioBuscado) return;
    this.cargandoCarreras = true;
    
    this.f1Service.getCarreras(this.anioBuscado).subscribe({
      next: (data) => {
        // Adaptar según cómo devuelva la API (ej. data.results o data.races)
        this.carreras = data.results || data; 
        this.cargandoCarreras = false;
      },
      error: (err) => {
        console.error('Error al cargar carreras', err);
        this.cargandoCarreras = false;
      }
    });
  }

  // Consumir webservice "Session" al hacer click en "Ver posiciones" 
  verPosiciones(sessionId: number, sessionName: string): void {
    this.nombreSesionActual = sessionName;
    this.cargandoPilotos = true;
    this.pilotosSesion = [];

    this.f1Service.getPosicionesSesion(sessionId).subscribe({
      next: (data) => {
        this.pilotosSesion = data.results || data;
        this.cargandoPilotos = false;
      },
      error: (err) => {
        console.error('Error al cargar pilotos', err);
        this.cargandoPilotos = false;
      }
    });
  }

  // Consumir service "constructor standing" y mostrar el primero y último 
  consultarConstructores(): void {
    if (!this.anioBuscado) return;
    this.cargandoConstructores = true;
    this.constructoresFiltrados = [];

    this.f1Service.getConstructores(this.anioBuscado).subscribe({
      next: (data) => {
        const constructores = data.results || data;
        
        // Filtramos estrictamente el primero y el último 
        if (constructores.length > 0) {
          this.constructoresFiltrados = [
            constructores[0], 
            constructores[constructores.length - 1]
          ];
        }
        this.cargandoConstructores = false;
      },
      error: (err) => {
        console.error('Error al cargar constructores', err);
        this.cargandoConstructores = false;
      }
    });
  }
}