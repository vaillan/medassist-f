/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { HttpService } from '../../../services/http.service';
import { ShareService } from '../../../services/share.service';
import { Router } from '@angular/router';
import { NotificationsService } from '@myorg/snackbar-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup = new FormGroup({});
  subscriptions: Subscription = new Subscription();
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;
  hide: boolean;
  user: any;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private shareService: ShareService,
    private router: Router,
    private notificationService: NotificationsService
  ) {
    this.hide = true;
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
          ),
        ],
      ],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.subscriptions.add(
      this.httpService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.user = res.user;
          sessionStorage.setItem('token', res.tokens.token);
          sessionStorage.setItem('refresh_token', res.tokens.refresh_token);
          sessionStorage.setItem('user', JSON.stringify(res.user));
          this.subscriptions.add(this.shareService.changeStatusLogged(true));
          this.subscriptions.add(this.shareService.changeCurrentUser(res.user));
        },
        error: (error) => {
          console.error(error);
          this.notificationService.openSnackBar(
            'Sin autorización',
            'right',
            'top',
            5000,
            'danger'
          );
        },
        complete: () => {
          this.router.navigateByUrl('/med');
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
