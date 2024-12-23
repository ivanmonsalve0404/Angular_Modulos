import { Injectable } from '@angular/core';
import *as urls from '../../utilities/dominios/uris'
import { HttpClient } from '@angular/common/http';
import { URL_SESION } from '../../utilities/dominios/uris';
import { Acceso } from '../../modelos/acceso';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { DatosSesion } from '../../modelos/datosSesion';
@Injectable({
  providedIn: 'root'
})
export class AccesoService {

  public urlAcceso: string;
  public datosSesion: any;
  public fotoUsuario: string;

  constructor(private http: HttpClient, private navegacion: Router) {
    this.urlAcceso = urls.URL_SESION;
    this.datosSesion = this.inicializarDatosSesion();
    this.fotoUsuario = '';
  }

  private inicializarDatosSesion(){
    return new DatosSesion(0, "", "", "");
  }

  public iniciarSesion(objAcceso: Acceso): Observable<any> {
    return this.http.post<any>(this.urlAcceso, objAcceso);
  }

  public obtenerToken():string{
    return localStorage.getItem('TOKEN_AUTORIZACION') as string;
  }

  public verificarUsuario(): boolean {
    let tokenSesion = this.obtenerToken();
    if (tokenSesion) {
      try {
        let objTmp: any = jwtDecode(tokenSesion);
        this.datosSesion = new DatosSesion(
          objTmp.id,
          objTmp.correoAcceso,
          objTmp.nombreUsuario,
          objTmp.apellidosUsuario
        );
        this.fotoUsuario = localStorage.getItem("FOTO_SISTEMA") as string;
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }
  public cerrarSesion(){
    localStorage.removeItem('TOKEN_AUTORIZACION');
    localStorage.removeItem('FOTO_SISTEMA');
    this.datosSesion = '';
    this.fotoUsuario = '';
    this.navegacion.navigate(['/land/signin']);
  }


}
