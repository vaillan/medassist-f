import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermisosRoutingModule } from './permisos-routing.module';
import { PermisosComponent } from './permisos.component';
import { MaterialModule } from '@myorg/material';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { GruposPermisosComponent } from './grupos-permisos/grupos-permisos.component';

@NgModule({
  declarations: [
    PermisosComponent,
    GruposPermisosComponent,
  ],
  imports: [
    CommonModule,
    PermisosRoutingModule,
    MaterialModule,
    ScrollingModule,
  ],
})
export class PermisosModule {}
