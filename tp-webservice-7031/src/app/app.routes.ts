import { Routes } from '@angular/router';

// 1. Importamos los componentes que van a ser las "Páginas"
import { Home } from './components/layout/home/home.component'; 
import { PeliculasComponent } from './components/punto-a/peliculas.component';
import { AutosComponent } from './components/punto-b/autos.component'; // Reemplaza por tu componente real
import { ConversorComponent } from './components/punto-c/conversor.component'; // Reemplaza por tu componente real
// Importa aquí los demás (Conversor, TextToSpeech, etc.)

export const routes: Routes = [
  // 2. Definimos qué ruta en la URL carga qué componente
  { path: 'home', component: Home },
  { path: 'app-peliculas', component: PeliculasComponent },
  { path: 'app-autos', component: AutosComponent }, // Reemplaza por tu componente real
  { path: 'app-conversor', component: ConversorComponent }, // Reemplaza por tu componente real
  { path: 'parte2', component: Home }, // Reemplaza por tu componente real
  { path: 'punto3', component: Home }, // Reemplaza por tu componente real
  
  // 3. Rutas por defecto y comodines (¡Muy recomendado!)
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Si la ruta está vacía, va a 'home'
  { path: '**', redirectTo: 'home' } // Si el usuario escribe una URL que no existe, vuelve a 'home'
];