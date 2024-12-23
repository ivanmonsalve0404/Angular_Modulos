import { Injectable } from '@angular/core';
import * as urls from '../../utilities/dominios/uris';
import { HttpClient } from '@angular/common/http';
import { UsuarioRegistro } from '../../modelos/usuario-registro';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private urlRegistro: string;

  constructor(private http: HttpClient) {
    this.urlRegistro = urls.URL_REGISTRO;
  }

  public registrarUsuario(objRegistro: UsuarioRegistro): Observable<UsuarioRegistro> {
    return this.http.post<UsuarioRegistro>(this.urlRegistro, objRegistro);
  }
}
