import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedComponent } from './med.component';

const routes: Routes = [
  {
    path: '',
    component: MedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedRoutingModule { }
