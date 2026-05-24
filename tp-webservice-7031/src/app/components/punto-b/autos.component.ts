import { Component, OnInit } from '@angular/core';
import { AutosService } from '../../services/autos.service'; // Ajusta tu ruta

@Component({
  selector: 'app-autos',
  standalone: true,
  imports: [], // Si usas algo extra, ponlo aquí
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.css']
})
export class AutosComponent implements OnInit {
  
  marcas: any[] = [];
  
  // Variables para el Modal
  marcaSeleccionada: string = '';
  modelosActuales: any[] = [];
  cargandoModelos: boolean = false;

  // Nuestro "Diccionario" para no gastar consultas de más
  modelosCache: { [key: string]: any[] } = {};

  constructor(private autosService: AutosService) {}

  ngOnInit(): void {
    this.cargarMarcas();
  }

  cargarMarcas(): void {
    this.autosService.getMarcas().subscribe({
      next: (data) => {
        console.log('Marcas recibidas:', data);
        this.marcas = data; // OJO: Si la consola muestra { makes: [...] }, cambia a data.makes
      },
      error: (err) => console.error('Error al cargar marcas', err)
    });
  }

  verModelos(marca: any): void {
    // Extraemos el nombre de la marca (Verifica en consola si se llama 'name', 'make', etc.)
    const nombreMarca = marca.name; 
    this.marcaSeleccionada = nombreMarca;
    this.modelosActuales = [];

    // Verificamos si YA buscamos esta marca antes
    if (this.modelosCache[nombreMarca]) {
      console.log(`Modelos de ${nombreMarca} cargados desde la CACHÉ (Ahorraste 1 consulta)`);
      this.modelosActuales = this.modelosCache[nombreMarca];
      return; // Salimos de la función para no llamar a la API
    }

    // Si no la tenemos, llamamos a la API
    this.cargandoModelos = true;
    this.autosService.getModelos(nombreMarca).subscribe({
      next: (data) => {
        console.log(`Modelos de ${nombreMarca} recibidos de la API:`, data);
        this.modelosActuales = data; // OJO: Igual que arriba, verifica el nombre exacto de la propiedad en la consola
        // Guardamos en nuestro caché para el futuro
        this.modelosCache[nombreMarca] = this.modelosActuales;
        this.cargandoModelos = false;
      },
      error: (err) => {
        console.error('Error al cargar modelos', err);
        this.cargandoModelos = false;
      }
    });
  }
}