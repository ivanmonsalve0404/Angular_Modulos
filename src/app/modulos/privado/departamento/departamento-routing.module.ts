import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListarDepartamentoComponent } from './listar-departamento/listar-departamento.component';
import { CrearDepartamentoComponent } from './crear-departamento/crear-departamento.component';
import { AdministrarDepartamentoComponent } from './administrar-departamento/administrar-departamento.component';
import { ActualizarDepartamentoComponent } from './actualizar-departamento/actualizar-departamento.component';
import { ErrorComponent } from '../../publico/error/error.component';

const rutasDepartamento: Routes = [
  { path: 'list', component: ListarDepartamentoComponent },
  { path: 'add', component: CrearDepartamentoComponent },
  { path: 'admin', component: AdministrarDepartamentoComponent },
  { path: 'update/:codDepartamento', component: ActualizarDepartamentoComponent },

  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: '**', component: ErrorComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(rutasDepartamento)
  ],
  exports: [RouterModule]
})
export class DepartamentoRoutingModule { }
