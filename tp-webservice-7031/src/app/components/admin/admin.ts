import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- ¡ESTO SOLUCIONA EL ERROR DE ngModel!
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CrudService, Nota } from '../../services/crud.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule], // <-- ¡NO OLVIDES ESTA LÍNEA!
  templateUrl: './admin.html', // Verifica que este nombre coincida con tu HTML
  styleUrls: ['./admin.css']
})
export class AdminComponent implements OnInit { 
  // (Nota: Si tu error decía "type 'Admin'", Angular asume que tu clase se llama AdminComponent. 
  // Mantén AdminComponent aquí para que funcione correctamente).

  // --- 1. VARIABLES ---
  usuario: string = '';
  contrasenia: string = '';
  errorLogin: boolean = false;
  estaLogueado: boolean = false;

  listaNotas: Nota[] = [];
  nuevaNota: Nota = { title: '', body: '', userId: 1 };
  notaEnEdicion: Nota | null = null;

  constructor(
    private authService: AuthService, 
    private crudService: CrudService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.estaLogueado = this.authService.isLoggedIn();
    if (this.estaLogueado) {
      this.cargarNotas();
    }
  }

  // --- 2. LÓGICA DE LOGIN ---
  procesarLogin(): void {
    if (this.authService.login(this.usuario, this.contrasenia)) {
      this.estaLogueado = true;
      this.errorLogin = false;
      this.router.navigate(['/app-admin']); // Redirige al admin después de un login exitoso
      this.cargarNotas();
    } else {
      this.errorLogin = true;
    }
  }

  procesarLogout(): void {
    this.authService.logout();
    this.estaLogueado = false;
    this.router.navigate(['/']); 
  }

  // --- 3. LÓGICA DE CRUD ---
  cargarNotas(): void {
    this.crudService.obtenerNotas().subscribe(data => this.listaNotas = data);
  }

  guardarNota(): void {
    if (!this.nuevaNota.title || !this.nuevaNota.body) return;

    if (this.notaEnEdicion && this.notaEnEdicion.id) {
      this.crudService.actualizarNota(this.notaEnEdicion.id, this.nuevaNota).subscribe(notaActualizada => {
        const index = this.listaNotas.findIndex(n => n.id === this.notaEnEdicion?.id);
        this.listaNotas[index] = notaActualizada;
        this.cancelarEdicion();
      });
    } else {
      this.crudService.crearNota(this.nuevaNota).subscribe(notaCreada => {
        this.listaNotas.unshift(notaCreada);
        this.nuevaNota = { title: '', body: '', userId: 1 };
      });
    }
  }

  seleccionarParaEditar(nota: Nota): void {
    this.notaEnEdicion = nota;
    this.nuevaNota = { ...nota }; 
  }

  cancelarEdicion(): void {
    this.notaEnEdicion = null;
    this.nuevaNota = { title: '', body: '', userId: 1 };
  }

  eliminarNota(id: number | undefined): void {
    if (!id) return;
    this.crudService.borrarNota(id).subscribe(() => {
      this.listaNotas = this.listaNotas.filter(n => n.id !== id);
    });
  }
}