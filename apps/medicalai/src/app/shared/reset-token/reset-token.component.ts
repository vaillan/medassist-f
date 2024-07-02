/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { ShareService } from '../../services/share.service';
import { MenuService } from '../../services/menu.service';
import { Subscription } from 'rxjs';
import { MaterialModule } from '@myorg/material';
@Component({
  selector: 'app-reset-token',
  templateUrl: './reset-token.component.html',
  styleUrls: ['./reset-token.component.scss'],
  standalone: true,
  imports: [MaterialModule],
})
export class ResetTokenComponent implements OnDestroy {

  subscriptions: Subscription;

  constructor(
    public dialogRef: MatDialogRef<ResetTokenComponent>,
    private httpService: HttpService,
    private router: Router,
    private sharedService: ShareService,
    private menuService: MenuService
  ){
    this.subscriptions = new Subscription();
  }

  borrarCredenciales(): void {
    this.actualizarToken();
    this.subscriptions.add(
      this.httpService.logOut({refresh_token: sessionStorage.getItem('refresh_token')}).subscribe({
        next: (res) => {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('refresh_token');
          sessionStorage.removeItem('user');
          this.sharedService.changeStatusLogged(false);
          this.sharedService.changeCurrentUser(null);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.setMenu();
          this.router.navigate(['/page']);
        }
      })
    );

  }

  actualizarToken(): void {
    this.subscriptions.add(
      this.httpService.refreshToken({refresh: sessionStorage.getItem('refresh_token')}).subscribe({
        next: (res) => {
          sessionStorage.setItem('token', res.access);
          sessionStorage.setItem('refresh_token', res.refresh);
        }
      })
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }


  private setMenu(): void {
    this.menuService.setMenu();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
