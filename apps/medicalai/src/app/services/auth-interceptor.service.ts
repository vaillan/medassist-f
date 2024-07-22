/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { ResetTokenComponent } from '../shared/reset-token/reset-token.component';
import { LoadingComponent } from '../shared/loading/loading.component';
import { ShareService } from './share.service';
import { MenuService } from './menu.service';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService {

    readonly errorListCode: Array<number>;
    private totalRequests = 0;
    private dialogRef: Array<MatDialogRef<LoadingComponent>> = [];
    constructor(
        private router: Router,
        public dialog: MatDialog,
        public tokenDialog: MatDialog,
        private shareService: ShareService,
        private menuService: MenuService,
    ) {
        this.errorListCode = [403];
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = sessionStorage.getItem('token');
        let request = req;
        this.totalRequests++;
        this.openDialog();
        if (token) {
            request = req.clone({
                setHeaders: {
                    'Authorization': `Bearer ${token}`,
                }
            });
        }
        return next.handle(request).pipe(
            finalize(() => {
                this.totalRequests--;
                if (this.totalRequests == 0) {
                    this.closeDialog();
                }
            }),
            catchError((err: HttpErrorResponse) => {
                if (err.error.code === "token_not_valid") {
                    this.clearSession();
                    // this.openTokenDialog();

                }
                return throwError(err);
            })
        );
    }

    openDialog(): void {
        this.dialogRef.push(this.dialog.open(LoadingComponent, { disableClose: true, panelClass: 'loading' }));
    }

    closeDialog() {
        if (this.dialogRef.length > 0) {
            this.dialogRef.forEach(dialogLoading => {
                dialogLoading.close();
            });
        }
    }

    clearSession(): void {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('refresh_token');
        sessionStorage.removeItem('user');
        this.shareService.changeStatusLogged(false);
        this.shareService.changeCurrentUser(null);
        this.setMenu();
        this.router.navigate(['/med']);
    }

    private setMenu(): void {
        this.menuService.setMenu();
    }


    openTokenDialog(): void {
        this.tokenDialog.open(ResetTokenComponent, {
            disableClose: true,
        });
    }
}
