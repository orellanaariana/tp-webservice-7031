import { Component, OnInit } from '@angular/core';
import { AutosService } from '../../services/autos.service'; // Ajusta tu ruta

@Component({
  selector:'app-autos',
  standalone: true,
  imports: [],
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.css']
})
export class AutosComponent implements OnInit {
  
  marcas: any[] = [];
  
  // Variables para el Modal
  marcaSeleccionada: string = '';
  modelosActuales: any[] = [];
  cargandoModelos: boolean = false;

  //"Diccionario" para no gastar consultas de más
  modelosCache: { [key: string]: any[] } = {};

  constructor(private autosService: AutosService) {}

  ngOnInit(): void {
    this.cargarMarcas();
  }

  cargarMarcas(): void {
    this.autosService.getMarcas().subscribe({
      next: (data) => {
        console.log('Marcas recibidas:', data);
        
        // TRUCO SALVAVIDAS: Si los datos vienen dentro de un objeto (ej. data.data o data.makes), 
        // lo detectamos y extraemos solo el arreglo para que el @for de Angular no colapse.
        this.marcas = Array.isArray(data) ? data : (data.data || data.makes || data.results || Object.values(data)[0]);
      },
      error: (err) => console.error('Error al cargar marcas', err)
    });
  }

  verModelos(marca: any): void {
    // CORRECCIÓN: Extraemos el ID para la API y el Nombre para el título visual
    const idMarca = marca.id; 
    const nombreMarca = marca.name; 

    this.marcaSeleccionada = nombreMarca;
    this.modelosActuales = [];

    // Buscamos en el caché usando el ID numérico
    if (this.modelosCache[idMarca]) {
      console.log(`Modelos de ${nombreMarca} cargados desde la CACHÉ.`);
      this.modelosActuales = this.modelosCache[idMarca];
      return; 
    }

    this.cargandoModelos = true;
    
    // Llamamos a la API enviándole el ID, no el nombre
    this.autosService.getModelos(idMarca).subscribe({
      next: (data) => {
        console.log(`Modelos de ${nombreMarca} recibidos:`, data);
        
        // Mismo truco salvavidas para el arreglo de modelos
        this.modelosActuales = Array.isArray(data) ? data : (data.data || data.models || data.results || Object.values(data)[0]); 
        
        this.modelosCache[idMarca] = this.modelosActuales; // Guardamos en caché
        this.cargandoModelos = false;
      },
      error: (err) => {
        console.error('Error al cargar modelos', err);
        this.cargandoModelos = false;
      }
    });
  }
}