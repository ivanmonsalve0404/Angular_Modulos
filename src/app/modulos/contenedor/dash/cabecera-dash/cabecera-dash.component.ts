import { Component } from '@angular/core';
import { AccesoService } from '../../../../services/api/acceso.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecera-dash',
  templateUrl: './cabecera-dash.component.html',
  styleUrl: './cabecera-dash.component.css'
})
export class CabeceraDashComponent {
  constructor(public accesoService: AccesoService, private navegacion: Router) {
    
  }
}
