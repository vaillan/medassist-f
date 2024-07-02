import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { MaterialModule } from '@myorg/material';
import { CrearComponent } from './crear/crear.component';
import { EditarComponent } from './editar/editar.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [UsuariosComponent, CrearComponent, EditarComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    MaterialModule,
    ScrollingModule,
  ],
  providers: [DatePipe],
})
export class UsuariosModule {}
