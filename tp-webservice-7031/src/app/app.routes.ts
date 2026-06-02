import { Routes } from '@angular/router';

// 1. Importamos los componentes que van a ser las "Páginas"
import { Home } from './components/layout/home/home.component'; 
import { PeliculasComponent } from './components/punto-a/peliculas.component';
import { AutosComponent } from './components/punto-b/autos.component'; // Reemplaza por tu componente real
import { ConversorComponent } from './components/punto-c/conversor.component'; // Reemplaza por tu componente real
import { TtsComponent } from './components/punto-d/tts.component'; 
import { ClimaComponent } from './components/punto-e/clima.component';
import { AdminComponent } from './components/admin/admin';
import { authGuard } from './components/auth/auth.guard'; // Importa tu guardia de autenticación
import { F1Component } from './components/punto-f/f1.component';
import { RecetasComponent } from './components/evaluacion/recetas.component';
import { IpComponent } from './components/ip/ip.component'; 
import { YoutubeComponent } from './components/youtube/youtube.component';
import { AmazonComponent } from './components/amazon/amazon.component';
import { LugaresComponent } from './components/lugares/lugares.component'; // Importa tu componente de Lugares

export const routes: Routes = [
  // 2. Definimos qué ruta en la URL carga qué componente
  { path: 'home', component: Home },
  { path: 'app-peliculas', component: PeliculasComponent },
  { path: 'app-autos', component: AutosComponent }, // Reemplaza por tu componente real
  { path: 'app-conversor', component: ConversorComponent }, // Reemplaza por tu componente real
  { path: 'app-tts', component: TtsComponent }, 
  { path: 'app-clima', component: ClimaComponent },
  { path: 'app-admin', component: AdminComponent, canActivate: [authGuard] },
  { path: 'app-f1', component: F1Component }, // Ruta para el componente de F1
  { path: 'login', component: AdminComponent },
  { path: 'app-recetas', component: RecetasComponent }, 
  { path: 'app-ip', component: IpComponent },
  { path: 'app-youtube', component: YoutubeComponent },
  { path: 'app-amazon', component: AmazonComponent }, 
  { path: 'app-lugares', component: LugaresComponent },
 
  // 3. Rutas por defecto y comodines 
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Si la ruta está vacía, va a 'home'
  { path: '**', redirectTo: 'home' } // Si el usuario escribe una URL que no existe, vuelve a 'home'
];