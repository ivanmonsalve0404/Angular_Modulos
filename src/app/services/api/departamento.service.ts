import { Injectable } from '@angular/core';
import * as urls from '../../utilities/dominios/uris';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departamento } from '../../modelos/departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  public urlDepartamento: string;

  constructor(private http: HttpClient) {
    this.urlDepartamento = urls.URL_DEPARTAMENTO_API;
  }

  public consultarDepartamentos(): Observable<Departamento[]>{
    return this.http.get<Departamento[]>(this.urlDepartamento + "/list");
  }
  public buscarDepartamentos(codDepartamento: number): Observable<Departamento>{
    return this.http.get<Departamento>(this.urlDepartamento + "/one/" + codDepartamento);
  }

  public agregarDepartamento(objRegistrar: Departamento): Observable<Departamento>{
    return this.http.post<Departamento>(this.urlDepartamento + "/add", objRegistrar);
  }

  public actualizarDepartamento(objActualizar: Departamento): Observable<Departamento>{
    return this.http.put<Departamento>(this.urlDepartamento + "/update", objActualizar);
  }

  public eliminarDepartamento(codDepartamento: number): Observable<Departamento>{
    return this.http.delete<Departamento>(this.urlDepartamento + "/delete/" + codDepartamento);
  }

}
