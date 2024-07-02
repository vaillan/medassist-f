import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermisosComponent } from './permisos.component';
import { GruposPermisosComponent } from './grupos-permisos/grupos-permisos.component';

const routes: Routes = [
  {
    path: '',
    component: PermisosComponent,
  },
  {
    path: 'groups',
    component: GruposPermisosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermisosRoutingModule {}
