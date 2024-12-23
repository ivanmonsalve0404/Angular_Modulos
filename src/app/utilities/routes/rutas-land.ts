import { Routes } from "@angular/router";
import { ErrorComponent } from "../../modulos/publico/error/error.component";

export const RUTAS_LANDSCAPE: Routes =[
    {
        path: 'land', loadChildren: () => import('../../modulos/publico/publico.module').then((m) => m.PublicoModule)
    },

    { path: '', redirectTo: 'land', pathMatch: "full"},
    { path: '**', component: ErrorComponent },
   
]

