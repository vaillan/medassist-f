/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'lib-snackbar-notifications',
  templateUrl: './snackbar-notifications.component.html',
  styleUrls: ['./snackbar-notifications.component.scss'],
})
export class SnackbarNotificationsComponent {
  snackBarRef = inject(MatSnackBarRef);
	constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
