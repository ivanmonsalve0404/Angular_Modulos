import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AccesoService } from './services/api/acceso.service';
import { crearMensaje } from './utilities/funciones/mensaje';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private navegacion: Router, private toastr: ToastrService, private accesoService: AccesoService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenSesion: string = this.accesoService.obtenerToken();

    let modificarPeticion = req.clone({
      setHeaders: { authorization: 'Bearer ' + tokenSesion }
    })

    return next.handle(modificarPeticion).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }), catchError((error: HttpErrorResponse) => {
        if (error.status == 401) {
          this.navegacion.navigate(['/land/signin']);
          this.accesoService.cerrarSesion();
          crearMensaje('error', 'Acceso denegado por el sistema de seguridad', 'Error', this.toastr);
        }

        return throwError(() => error);
      })
    );
  }
}
