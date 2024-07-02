import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedRoutingModule } from './med-routing.module';
import { MedComponent } from './med.component';
import { MaterialModule } from '@myorg/material';


@NgModule({
  declarations: [
    MedComponent
  ],
  imports: [
    CommonModule,
    MedRoutingModule,
    MaterialModule,
  ]
})
export class MedModule { }
