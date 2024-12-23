import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuerpoLandComponent } from './modulos/contenedor/cuerpo-land/cuerpo-land.component';
import { RUTAS_LANDSCAPE } from './utilities/routes/rutas-land';
import { CuerpoDashComponent } from './modulos/contenedor/dash/cuerpo-dash/cuerpo-dash.component';
import { RUTAS_DASHBOARH } from './utilities/routes/rutas-dash';
import { ErrorComponent } from './modulos/publico/error/error.component';
import { VigilanteGuard } from './vigilante.guard';

const routes: Routes = [

  { path: 'privado', component: CuerpoDashComponent, children: RUTAS_DASHBOARH, canActivate: [VigilanteGuard]},
  

  { path: '', component: CuerpoLandComponent, children: RUTAS_LANDSCAPE },
  { path: '**', component: ErrorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
