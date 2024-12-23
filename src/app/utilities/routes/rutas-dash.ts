import { Routes } from "@angular/router";
import { ErrorInternoComponent } from "../../modulos/privado/control/error-interno/error-interno.component";

export const RUTAS_DASHBOARH: Routes=[
    {
        path: 'dash', loadChildren: () => import('../../modulos/privado/control/control.module').then((m) => m.ControlModule)
    },
    {
        path: 'departament', loadChildren: () => import('../../modulos/privado/departamento/departamento.module').then((m) => m.DepartamentoModule)
    },



    { path: '', redirectTo: 'dash', pathMatch: "full" },
    { path: '**', component: ErrorInternoComponent },
       
]
