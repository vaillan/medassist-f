import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '@myorg/material';
import { SnackbarNotificationsModule } from '@myorg/snackbar-notifications';
import { BreadcrumbModule } from 'xng-breadcrumb';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    BreadcrumbModule,
    SnackbarNotificationsModule,
  ],

})
export class AuthModule { }
