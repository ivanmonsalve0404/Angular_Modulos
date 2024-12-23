import { Component, TemplateRef } from '@angular/core';
import { Departamento } from '../../../../modelos/departamento';
import { catchError, finalize, map, Subscription } from 'rxjs';
import { DepartamentoService } from '../../../../services/api/departamento.service';
import { observadorAny } from '../../../../utilities/observadores/tipo-any';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { crearMensaje } from '../../../../utilities/funciones/mensaje';

@Component({
  selector: 'app-administrar-departamento',
  templateUrl: './administrar-departamento.component.html',
  styleUrl: './administrar-departamento.component.css'
})
export class AdministrarDepartamentoComponent {

  public arrDepartamentos: Departamento[];
  public temp: any;
  public suscripcionDepartamento: Subscription;

  public paginaActual: number;
  public cantidadMostrar: number;
  public cantidadPaginas: number;
  public cantidadTotalRegistros: number;

  public departamentoSeleccionado: Departamento;
  public contenidoModal:string;
  public tituloModal:string;
  public cuerpoModal:string;
  public modalRef: BsModalRef;

  public cargaFinalizada: boolean;

  constructor(private departamentoService: DepartamentoService, private modalService: BsModalService, private toastr: ToastrService) {
    this.arrDepartamentos = [];
    this.suscripcionDepartamento = this.temp;

    this.paginaActual = 0;
    this.cantidadMostrar = 0;
    this.cantidadPaginas = 0;
    this.cantidadTotalRegistros = 0;

    this.cargaFinalizada = false;

    this.departamentoSeleccionado = this.inicializarDepartamento();
    this.tituloModal = '';
    this.cuerpoModal = '';
    this.contenidoModal = '';
    this.modalRef = this.temp;
  }

  ngOnInit(): void {
    this.paginaActual = 1;
    this.cantidadMostrar = 10;
    this.obtenerDepartamentos();
  }

  ngOnDestroy(): void {
    if (this.suscripcionDepartamento) {
      this.suscripcionDepartamento.unsubscribe();
    }
  }

  /**Inicio de lógica de negocio */
  /*Lógica del Negocio*/
  private inicializarDepartamento(): Departamento {
    return new Departamento(0, "");
  }

  private obtenerDepartamentos() {
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

   /** Ventana Modal*/
   public abrirVentanaEliminar(template: TemplateRef<any>, objDepartamento: Departamento): void {
    this.departamentoSeleccionado = objDepartamento;
    this.tituloModal = "Eliminar Departamento";
    this.cuerpoModal = "¿Estás seguro de eliminar el departamento?";
    this.contenidoModal = this.departamentoSeleccionado.nombreDepartamento;
    this.modalRef = this.modalService.show(template, {backdrop: "static", class: "sm"});
  }

  public botonCancelar(): void {
    //crearMensaje("warning", "Le dio miedo al perro", "Muy suavee", this.toastr);
    this.modalRef.hide();
    this.obtenerDepartamentos();
    this.departamentoSeleccionado = this.inicializarDepartamento();
  }

  public botonEliminar(): void {
    this.eliminarDepartamento(this.departamentoSeleccionado);
    this.modalRef.hide();
    this.departamentoSeleccionado = this.inicializarDepartamento();
  }

  private eliminarDepartamento(objEliminar: Departamento): void {
    this.suscripcionDepartamento = this.departamentoService.eliminarDepartamento(this.departamentoSeleccionado.codDepartamento).pipe(
      map((respuesta) => {
        crearMensaje("success", "Se ha eliminado el departamento", "Eliminación exitosa", this.toastr);
        this.obtenerDepartamentos();
        return respuesta;
      }),
      catchError((elError) => {
        crearMensaje("error", "No se ha podido eliminar el departamento", "Error en la eliminación", this.toastr);
        throw elError;
      })
    ).subscribe(observadorAny);
  }

}
