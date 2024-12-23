import { AccesoService } from './../../../services/api/acceso.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, map, Subscription } from 'rxjs';
import { Acceso } from '../../../modelos/acceso';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import cifrado from 'jssha';
import { observadorAny } from '../../../utilities/observadores/tipo-any';
import { crearMensaje } from '../../../utilities/funciones/mensaje';
import { jwtDecode } from 'jwt-decode';
import { DatosSesion } from '../../../modelos/datosSesion';

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrl: './acceso.component.css'
})
export class AccesoComponent implements OnInit, OnDestroy {

  public objAcceso: Acceso;
  public suscripcionAcceso: Subscription;
  public tmp: any;

  constructor(private navegacion: Router, private accesoService: AccesoService, private toastrService: ToastrService) {
    this.objAcceso = this.inicializarAcceso();
    this.suscripcionAcceso = this.tmp;
  }

  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
    if (this.suscripcionAcceso) {
      this.suscripcionAcceso.unsubscribe();
    }
  }

  /**Logica del negocio */
  private inicializarAcceso(): Acceso {
    return new Acceso(0, "", "");
  }

  public enviarFormulario(formulario: NgForm): void {
    const objCifrado: cifrado = new cifrado('SHA-512', 'TEXT');
    const claveCifrada = objCifrado.update(this.objAcceso.claveAcceso).getHash('HEX');
    this.objAcceso.claveAcceso = claveCifrada;

    this.suscripcionAcceso = this.accesoService.iniciarSesion(this.objAcceso).pipe(
      map((respuesta: any) => {
        const tokenSesion = respuesta.tokenApp;
        const fotoUsuario = respuesta.fotoApp;
        localStorage.setItem("TOKEN_AUTORIZACION", tokenSesion);
        localStorage.setItem("FOTO_USUARIO", fotoUsuario);

        let objTmp:any = jwtDecode(tokenSesion);


        const datosSesion = new DatosSesion(
          objTmp.id,
          objTmp.correoAcceso,
          objTmp.nombresUsuario,
          objTmp.apellidosUsuario
        );

        crearMensaje('success', 'Bienvenido ' + datosSesion.nombresUsuario, 'Sesion Iniciada', this.toastrService);
        this.navegacion.navigate(['/privado/dash']);
        return respuesta;
      }),
      catchError((elError) => {
        formulario.reset();
        this.toastrService.error("Error al iniciar sesión", "Error");
        crearMensaje('error', 'Fallo al realizar la autenticacion', 'Error', this.toastrService);
        throw elError;
      })
    ).subscribe(observadorAny)
  }

}
