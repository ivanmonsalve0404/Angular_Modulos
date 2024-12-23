import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartamentoRoutingModule } from './departamento-routing.module';
import { CrearDepartamentoComponent } from './crear-departamento/crear-departamento.component';
import { AdministrarDepartamentoComponent } from './administrar-departamento/administrar-departamento.component';
import { ActualizarDepartamentoComponent } from './actualizar-departamento/actualizar-departamento.component';
import { ListarDepartamentoComponent } from './listar-departamento/listar-departamento.component';
import { FormsModule } from '@angular/forms';
import { CompartidoModule } from "../../compartido/compartido.module";
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    CrearDepartamentoComponent,
    AdministrarDepartamentoComponent,
    ActualizarDepartamentoComponent,
    ListarDepartamentoComponent
  ],
  imports: [
    CommonModule,
    DepartamentoRoutingModule,
    FormsModule,
    CompartidoModule,
    NgxPaginationModule
]
})
export class DepartamentoModule { }
