import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <--- ¡Vital para usar [(ngModel)]!
import { ConversorService } from '../../services/conversor.service'; // Ajusta tu ruta
import { DecimalPipe } from '@angular/common'; // Para formatear el resultado
@Component({
  selector: 'app-conversor',
  standalone: true,
  imports: [FormsModule, DecimalPipe], // <--- No olvides agregarlo aquí
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.css']
})
export class ConversorComponent {
  
  // Variables conectadas al HTML
  cantidad: number = 1;
  monedaOrigen: string = 'USD';
  monedaDestino: string = 'ARS';
  
  // Variables para el resultado y estado
  resultado: number | null = null;
  cargando: boolean = false;

  // Una pequeña lista de monedas para las listas desplegables
  listaMonedas = [
    { codigo: 'USD', nombre: 'Dólares EEUU' },
    { codigo: 'ARS', nombre: 'Pesos Argentinos' },
    { codigo: 'EUR', nombre: 'Euros' },
    { codigo: 'BRL', nombre: 'Reales Brasileños' },
    { codigo: 'GBP', nombre: 'Libras Esterlinas' }
  ];

  constructor(private conversorService: ConversorService) {}

  realizarConversion(): void {
    // Validamos que haya una cantidad válida
    if (this.cantidad <= 0) return;

    this.cargando = true;
    this.resultado = null;

    this.conversorService.convertir(this.monedaOrigen, this.monedaDestino, this.cantidad).subscribe({
      next: (data) => {
        console.log('Respuesta de la API:', data);
        // La API de APILayer devuelve el valor convertido dentro de la propiedad "result"
        this.resultado = data.result;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al convertir', err);
        this.cargando = false;
      }
    });
  }
}