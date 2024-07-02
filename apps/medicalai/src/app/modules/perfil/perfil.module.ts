import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './perfil.component';
import { MaterialModule } from '@myorg/material';
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    PerfilComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    MaterialModule,
    ScrollingModule,
  ]
})
export class PerfilModule { }
