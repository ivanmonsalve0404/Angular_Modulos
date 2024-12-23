import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccesoComponent } from './acceso/acceso.component';
import { RegistroComponent } from './registro/registro.component';
import { ErrorComponent } from './error/error.component';

const rutas: Routes = [
  { path: 'signin', component: AccesoComponent },
  { path: 'register', component: RegistroComponent },

  //Agregar más rutas según sea necesario
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: '**', component: ErrorComponent } //Ruta para cualquier otro URL que no coincida con las anteriores

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(rutas)
  ],
  exports: [RouterModule]
})
export class PublicoRoutingModule { }
