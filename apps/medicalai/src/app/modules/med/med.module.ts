import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedRoutingModule } from './med-routing.module';
import { MedComponent } from './med.component';
import { MaterialModule } from '@myorg/material';
import { CarouselComponent } from '@myorg/ang-carousel';

@NgModule({
  declarations: [
    MedComponent,
  ],
  imports: [
    CommonModule,
    MedRoutingModule,
    MaterialModule,
    CarouselComponent,
  ]
})
export class MedModule { }
