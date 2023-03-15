import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, of, tap, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private _baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario() {

    return { ...this._usuario };
  }

  constructor(private http: HttpClient) {

  }

  login(email: string, password: string) {
    
    const url = `${this._baseUrl}/auth`;
    const body = { email, password };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(respuesta => {
          if(respuesta.ok) {
            localStorage.setItem('token', respuesta.token!);
            this._usuario = {
              name: respuesta.name!,
              uid: respuesta.uid!
            }
          }
        }),
        map( respuesta => respuesta.ok ),
        catchError( error => of(error.error.msg) )
      );
  }

  validarToken(): Observable<boolean> {
    const url = `${this._baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, {headers})
      .pipe(
        map( respuesta => {
          console.log(respuesta.token);
          localStorage.setItem('token', respuesta.token!);
            this._usuario = {
              name: respuesta.name!,
              uid: respuesta.uid!
            }
          return respuesta.ok;
        }),
        catchError(error => of(false))
      );
  }

  logOut() {
    // localStorage.clear();
    localStorage.removeItem('token');
  }
}