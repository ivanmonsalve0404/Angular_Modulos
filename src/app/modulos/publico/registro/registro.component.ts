import { observadorAny } from './../../../utilities/observadores/tipo-any';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuarioRegistro } from '../../../modelos/usuario-registro';
import { catchError, map, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { RegistroService } from '../../../services/api/registro.service';
import cifrado from 'jssha';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit, OnDestroy {
  public objRegistro: UsuarioRegistro;
  public suscripcionRegistro: Subscription;
  public tmp: any;

  constructor(private navegacion: Router, private registroService: RegistroService, private toastr: ToastrService) {
    this.objRegistro = this.inicializarUsuarioRegistro();
    this.suscripcionRegistro = this.tmp;
  }

  ngOnDestroy(): void {
    if(this.suscripcionRegistro) {
      this.suscripcionRegistro.unsubscribe();
    }
  }
  ngOnInit(): void {
  }

  /* Inicio lógica de negocio */
  private inicializarUsuarioRegistro(): UsuarioRegistro {
    return new UsuarioRegistro("", "", "", "");
  }

  public enviarFormulario(formulario: NgForm): void {
    const objCifrar:cifrado = new cifrado('SHA-512', 'TEXT');
    const claveCifrada = objCifrar.update(this.objRegistro.claveAcceso).getHash('HEX');

    this.objRegistro.claveAcceso = claveCifrada;

    this.suscripcionRegistro = this.registroService.registrarUsuario(this.objRegistro).pipe(
      map((respuesta: any)=> {
        localStorage.setItem("TOKEN_AUTORIZACION", respuesta.tokenApp);
        this.navegacion.navigate(['/private/dash']);
        return respuesta;
      }),
      catchError((elError) => {
        formulario.reset();
        throw elError;
      })
    ).subscribe((observadorAny));
  }
  /* Fin lógica de negocio */

}
