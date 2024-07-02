import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  standalone: true,
  imports: [MatProgressSpinnerModule],
})
export class LoadingComponent {
  constructor(public dialogRef: MatDialogRef<LoadingComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
