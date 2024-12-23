import { CanActivateFn, Router } from '@angular/router';
import { AccesoService } from './services/api/acceso.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class VigilanteGuard {
  
  constructor(private accesoService: AccesoService, private navegacion: Router) {

  }

  public canActivate(): boolean {
    if(this.accesoService.verificarUsuario()) {
      return true;
    } else {
      this.navegacion.navigate(['/land/signin']);
      return false;
    }
  }
};
