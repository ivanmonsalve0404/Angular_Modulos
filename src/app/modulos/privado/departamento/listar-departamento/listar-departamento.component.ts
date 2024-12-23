import { Component, OnDestroy, OnInit } from '@angular/core';
import { Departamento } from '../../../../modelos/departamento';
import { catchError, finalize, map, Subscription } from 'rxjs';
import { DepartamentoService } from '../../../../services/api/departamento.service';
import { observadorAny } from '../../../../utilities/observadores/tipo-any';

@Component({
  selector: 'app-listar-departamento',
  templateUrl: './listar-departamento.component.html',
  styleUrl: './listar-departamento.component.css'
})
export class ListarDepartamentoComponent implements OnInit, OnDestroy {

  public arrDepartamentos: Departamento[];
  public temp: any;
  public suscripcionDepartamento: Subscription;
  
  public paginaActual: number;
  public cantidadMostrar: number;
  public cantidadPaginas: number;
  public cantidadTotalRegistros: number;

  public cargaFinalizada: boolean;

  constructor(private departamentoService: DepartamentoService) {
    this.arrDepartamentos = [];
    this.suscripcionDepartamento = this.temp;

    this.paginaActual = 0;
    this.cantidadMostrar = 0;
    this.cantidadPaginas = 0;
    this.cantidadTotalRegistros = 0;

    this.cargaFinalizada = false;
  }
  
  ngOnInit(): void {
    this.paginaActual = 1;
    this.cantidadMostrar = 10;
    this.obtenerDepartamentos();
  }

  ngOnDestroy(): void {
    if(this.suscripcionDepartamento) {
      this.suscripcionDepartamento.unsubscribe();
    }
  }  

  /**Inicio de lógica de negocio */
  private obtenerDepartamentos(){
    this.suscripcionDepartamento = this.departamentoService.consultarDepartamentos().pipe(
      map((respuesta) => {
        console.log(respuesta);
        this.arrDepartamentos = respuesta;
        
        this.cantidadTotalRegistros = this.arrDepartamentos.length;
        /**Actualizar paginador */
        return respuesta;
      }),
      catchError((elError) => {
        throw elError;
      }),
      finalize(() => {
        this.cargaFinalizada = true;
      })
    ).subscribe(observadorAny);
  }

  public actualizarPaginador() {
    this.paginaActual = this.paginaActual;
    this.cantidadPaginas = Math.ceil(
      this.cantidadTotalRegistros / this.cantidadMostrar
    );
  }

  public cambiarPagina(evento: number): void {
    this.paginaActual = evento;
    this.obtenerDepartamentos();
  }

  public cambiarCantidadPaginador(): void {
    this.actualizarPaginador();
    this.obtenerDepartamentos();
  }
  /**Fin de lógica de negocio */
}
