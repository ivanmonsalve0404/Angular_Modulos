import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlRoutingModule } from './control-routing.module';
import { ErrorInternoComponent } from './error-interno/error-interno.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';



@NgModule({
  declarations: [
    ErrorInternoComponent,
    BienvenidaComponent
  ],
  imports: [
    CommonModule,
    ControlRoutingModule
  ]
})
export class ControlModule { }
