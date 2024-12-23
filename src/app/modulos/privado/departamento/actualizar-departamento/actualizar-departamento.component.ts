import { Component, OnDestroy, OnInit } from '@angular/core';
import { Departamento } from '../../../../modelos/departamento';
import { catchError, finalize, map, Subscription } from 'rxjs';
import { DepartamentoService } from '../../../../services/api/departamento.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { observadorAny } from '../../../../utilities/observadores/tipo-any';
import { NgForm } from '@angular/forms';
import { crearMensaje } from '../../../../utilities/funciones/mensaje';

@Component({
  selector: 'app-actualizar-departamento',
  templateUrl: './actualizar-departamento.component.html',
  styleUrl: './actualizar-departamento.component.css'
})
export class ActualizarDepartamentoComponent implements OnInit, OnDestroy {

  public objDepartamento: Departamento;
  public suscripcionDepartamento: Subscription;
  public tmp: any;
  public codigo: number;
  public cargaFinalizada: boolean;

  constructor(private departamentoService: DepartamentoService, private parametro: ActivatedRoute, private nevegacion: Router, private toastr: ToastrService) {
    this.objDepartamento = this.inicializarDepartamento();
    this.suscripcionDepartamento = this.tmp;
    this.cargaFinalizada = false;
    this.codigo = 0;
  }
  ngOnInit(): void {
    this.suscripcionDepartamento = this.parametro.paramMap.subscribe((elParametro: ParamMap) => {
      const dato = String(elParametro.get('codDepartamento'));
      this.codigo = parseFloat(dato) as number;
      this.consultarElDepartamento();
    })
  }

  ngOnDestroy(): void {
  }

  private inicializarDepartamento(): Departamento {
    return new Departamento(0, '');
  }

  private consultarElDepartamento(): void {
    this.suscripcionDepartamento = this.departamentoService.buscarDepartamentos(this.codigo).pipe(
      map((respuesta) => {
        this.objDepartamento = respuesta;
        return respuesta;
      }), catchError((elError) => {
        throw elError;
      }), finalize(() => {
        this.cargaFinalizada = true;
      })
    ).subscribe(observadorAny);
  }

  public enviarFormulario(formulario: NgForm): void {
    this.suscripcionDepartamento = this.departamentoService.actualizarDepartamento(this.objDepartamento).pipe(
      map((respuesta) => {
        crearMensaje('success', 'El departamento se actualizó correctamente', 'Actualización exitosa', this.toastr);
        this.nevegacion.navigate(['/privado/departament/admin']);
        this.objDepartamento = this.inicializarDepartamento();
        return respuesta;
      }), catchError((elError) => {
        crearMensaje('error', 'No se pudo actualizar el departamento', 'Error al actualizar', this.toastr);
        this.consultarElDepartamento();
        throw elError;
      })
    ).subscribe(observadorAny);
  }

}
