import { Injectable } from '@angular/core';
import {
    MatSnackBar,
    MatSnackBarConfig,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SnackBarAction } from './snackbar-notifications-types';
import { SnackbarNotificationsComponent } from './snackbar-notifications.component';

@Injectable({
    providedIn: 'root',
})
export class NotificationsService {
    constructor(private _snackBar: MatSnackBar) {}

    public openSnackBar(
        msg: string,
        horizontalPosition: MatSnackBarHorizontalPosition = 'end',
        verticalPosition: MatSnackBarVerticalPosition = 'top',
        duration: number | undefined = undefined,
        action: SnackBarAction = 'success'
    ): void {
        const config = new MatSnackBarConfig();
        const panelClass = this.nackbarClassAction(action);
        config.horizontalPosition = horizontalPosition;
        config.verticalPosition = verticalPosition;
        config.duration = duration;
        config.panelClass = panelClass;
        config.data = { message: msg };
        this._snackBar.openFromComponent(
            SnackbarNotificationsComponent,
            config
        );
    }

    private nackbarClassAction(
        action: SnackBarAction
    ): Array<string> | undefined {
        let panelClass = undefined;
        switch (action) {
            case 'success':
                panelClass = [
                    'bg-gradient-to-br',
                    'from-emerald-400',
                    'to-cyan-400',
                    'rounded',
                ];
                break;
            case 'warning':
                panelClass = [
                    'bg-gradient-to-br',
                    'from-amber-500',
                    'to-pink-500',
                    'rounded',
                ];
                break;

            case 'danger':
                panelClass = [
                    'bg-gradient-to-br',
                    'from-fuchsia-600',
                    'to-pink-600',
                    'rounded',
                ];
                break;

            default:
                break;
        }
        return panelClass;
    }
}
