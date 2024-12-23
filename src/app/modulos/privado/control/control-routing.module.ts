import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { ErrorInternoComponent } from './error-interno/error-interno.component';

const rutas:Routes=[
  { path: 'board', component: BienvenidaComponent },

  // rutas obligatorias 
  { path: '', redirectTo: 'board', pathMatch: 'full'},
  { path:' **', component: ErrorInternoComponent} 
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(rutas)
  ],
  exports: [RouterModule]
})
export class ControlRoutingModule { }
