import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Simulamos el login. Si ingresa "admin" y "1234", lo dejamos pasar
  login(usuario: string, contrasenia: string): boolean {
    if (usuario === 'admin' && contrasenia === '1234') {
      localStorage.setItem('token_falso', 'xyz123JWT');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('token_falso');
  }

  // Este método le dice a Angular si el usuario está dentro o no
  isLoggedIn(): boolean {
    return localStorage.getItem('token_falso') !== null;
  }
}