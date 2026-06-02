import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IpService } from '../../services/ip.service'; // Ajusta la ruta a tu proyecto

@Component({
  selector: 'app-ip',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ip.component.html',
  styleUrls: ['./ip.component.css']
})
export class IpComponent {

  ipInput: string = '200.106.249.7'; // IP de prueba provista (Unju)
  resultadoIp: any = null;
  cargandoIp: boolean = false;

  // Variables para el Punto 2 (Dirección por coordenadas)
  direccionResultante: any = null;
  cargandoDireccion: boolean = false;

  constructor(private ipService: IpService) {}

  // Consumir el Web Service 1 (POST IP Info)
  buscarInfoIp(): void {
    if (!this.ipInput.trim()) return;
    
    this.cargandoIp = true;
    this.resultadoIp = null;
    this.direccionResultante = null;

    this.ipService.postIpInfo(this.ipInput).subscribe({
      next: (data) => {
        this.resultadoIp = data;
        this.cargandoIp = false;
      },
      error: (err) => {
        console.error('Error al consultar la IP', err);
        this.cargandoIp = false;
      }
    });
  }

  // Formateadores auxiliares para cumplir estrictamente el boceto del examen
  getFechaLugar(): string {
    if (!this.resultadoIp?.['local-time']) return 'N/A';
    // Divide "2026-06-02 11:54:00" y toma solo la fecha
    return this.resultadoIp['local-time'].split(' ')[0];
  }

  getHoraLugar(): string {
    if (!this.resultadoIp?.['local-time']) return 'N/A';
    // Divide "2026-06-02 11:54:00" y toma solo la hora
    return this.resultadoIp['local-time'].split(' ')[1];
  }

  // Crea la URL dinámica completando la latitud y longitud obtenidas
  getGoogleMapsLink(): string {
    if (!this.resultadoIp) return '#';
    const lat = this.resultadoIp.latitude;
    const lon = this.resultadoIp.longitude;
    return `https://www.google.com/maps?q=${lat},${lon}`;
  }

  // ==========================================
  // RESOLUCIÓN PUNTO 2 (Llamada al segundo WS)
  // ==========================================
  obtenerDireccionExacta(): void {
    if (!this.resultadoIp?.latitude || !this.resultadoIp?.longitude) return;

    this.cargandoDireccion = true;
    this.ipService.getAddressFromCoords(this.resultadoIp.latitude, this.resultadoIp.longitude).subscribe({
      next: (data) => {
        // Guardamos la respuesta que contiene calle, nro, ciudad, etc.
        this.direccionResultante = data.address || data;
        this.cargandoDireccion = false;
      },
      error: (err) => {
        console.error('Error al obtener la dirección', err);
        this.cargandoDireccion = false;
      }
    });
  }
}