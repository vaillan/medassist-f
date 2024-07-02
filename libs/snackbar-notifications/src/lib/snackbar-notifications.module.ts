import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarNotificationsComponent } from './snackbar-notifications.component';
import { MaterialModule } from '@myorg/material';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [SnackbarNotificationsComponent],
  exports: [SnackbarNotificationsComponent],
})
export class SnackbarNotificationsModule {}
