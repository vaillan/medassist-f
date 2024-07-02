import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';
import { EditarComponent } from './editar/editar.component';
import { CrearComponent } from './crear/crear.component';

const routes: Routes = [
  {
    path: "",
    component: UsuariosComponent,
    data: {
      breadcrumb: 'Usuarios',
    },
  },
  {
    path: "edit/:id",
    component: EditarComponent,
    data: {
      breadcrumb: 'Edición',
    },
  },
  {
    path: "create",
    component: CrearComponent,
    data: {
      breadcrumb: 'Creación',
    },
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
