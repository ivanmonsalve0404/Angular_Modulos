import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuerpoLandComponent } from './cuerpo-land/cuerpo-land.component';
import { CabaceraLandComponent } from './cabacera-land/cabacera-land.component';
import { CuerpoDashComponent } from './dash/cuerpo-dash/cuerpo-dash.component';
import { CabeceraDashComponent } from './dash/cabecera-dash/cabecera-dash.component';
import { BarraLateralDashComponent } from './dash/barra-lateral-dash/barra-lateral-dash.component';
import { PieDashComponent } from './dash/pie-dash/pie-dash.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CuerpoLandComponent,
    CabaceraLandComponent,
    CuerpoDashComponent,
    CabeceraDashComponent,
    BarraLateralDashComponent,
    PieDashComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [ CuerpoDashComponent, CuerpoLandComponent ]
})
export class ContenedorModule { }
