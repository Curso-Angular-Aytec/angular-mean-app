import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map, of, tap } from 'rxjs';

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
            this._usuario = {
              name: respuesta.name!,
              uid: respuesta.uid!
            }
          }
        }),
        map( respuesta => respuesta.ok ),
        catchError( error => of(false) )
      );
  }
}