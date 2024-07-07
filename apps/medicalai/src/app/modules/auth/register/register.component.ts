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
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.sass',
})
export class RegisterComponent implements OnDestroy {
    registerForm: FormGroup = new FormGroup({});
    subscriptions: Subscription = new Subscription();
    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 5;
    hide: boolean;

    constructor(
        private fb: FormBuilder,
        private httpService: HttpService,
        private shareService: ShareService,
        private router: Router,
        private notificationService: NotificationsService
    ) {
        this.hide = true;
        this.registerForm = this.fb.group({
            username: [null, Validators.required],
            email: [
                null,
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
        return this.registerForm.controls;
    }

    onSubmit(): void {
        this.subscriptions.add(
            this.httpService.register(this.registerForm.value).subscribe({
                next: (res) => {
                    this.notificationService.openSnackBar(
                        res.msg,
                        'right',
                        'top',
                        5000,
                        'success'
                    );
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
                    this.router.navigateByUrl('/med/auth');
                },
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
