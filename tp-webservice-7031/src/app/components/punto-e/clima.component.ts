import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe} from '@angular/common'; // Para redondear números y mayúsculas
import { ClimaService } from '../../services/clima.service'; // Ajusta la ruta a tu proyecto

@Component({
  selector: 'app-clima',
  standalone: true,
  imports: [FormsModule, DecimalPipe], 
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.css']
})
export class ClimaComponent {

  ciudadBuscada: string = '';
  datosClima: any = null;
  cargando: boolean = false;
  mensajeError: string = '';

  constructor(private climaService: ClimaService) {}

  buscarClima(): void {
    if (!this.ciudadBuscada.trim()) return;

    this.cargando = true;
    this.datosClima = null;
    this.mensajeError = '';

    this.climaService.obtenerClima(this.ciudadBuscada).subscribe({
      next: (data) => {
        console.log('Datos del clima recibidos:', data);
        this.datosClima = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al buscar clima:', err);
        // Si el usuario escribe una ciudad que no existe, la API devuelve un 404
        this.mensajeError = 'No pudimos encontrar esa ciudad. Verifica el nombre e intenta de nuevo.';
        this.cargando = false;
      }
    });
  }
}