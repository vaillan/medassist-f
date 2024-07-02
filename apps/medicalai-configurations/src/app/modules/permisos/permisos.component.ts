/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from '../../services/http.service';
import { User } from '../../core/interfaces/user';
import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { ShareService } from '../../services/share.service';
import { NotificationsService } from '@myorg/snackbar-notifications';

@Component({
    selector: 'app-permisos',
    templateUrl: './permisos.component.html',
    styleUrl: './permisos.component.scss',
    animations: [
        trigger('detailExpand', [
            state('collapsed,void', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition(
                'expanded <=> collapsed',
                animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
            ),
        ]),
    ],
})
export class PermisosComponent implements OnInit, OnDestroy {
    subscriptions: Subscription;
    displayedColumnsUsers: Array<string>;
    usuariosDataSource!: Array<User>;
    columnsToDisplayWithExpand: Array<any>;
    permisos!: Array<any>;
    expandedElement: any;
    user!: User | null;

    constructor(
        private httpService: HttpService,
        private shareService: ShareService,
        private notificationsService: NotificationsService
    ) {
        this.subscriptions = new Subscription();
        this.subscriptions.add(
            this.shareService.currentUser$.subscribe(
                (user) => (this.user = user)
            )
        );
        this.usuariosDataSource = [];
        this.displayedColumnsUsers = ['username', 'first_name', 'last_name'];
        this.columnsToDisplayWithExpand = [
            ...this.displayedColumnsUsers,
            'expand',
        ];
    }

    ngOnInit(): void {
        this.refresh();
    }

    /**
     * Refresca los datos.
     * @returns {void}
     */
    refresh(): void {
        this.getPermisos();
        if (this.user?.is_superuser) {
            this.getUsuarios();
        } else {
            this.getUsuariosPorCreador();
        }
    }

    /**
     * Obtiene todos los ususrios
     * @returns {void}
     */
    getUsuarios(): void {
        this.subscriptions.add(
            this.httpService.getUsers().subscribe({
                next: (res) => {
                    this.usuariosDataSource = res.users;
                },
            })
        );
    }

    /**
     * Obtiene todos los usuarios activos por creador
     * @returns {void}
     */
    getUsuariosPorCreador(): void {
        this.subscriptions.add(
            this.httpService.getUsuariosPorCreador(this.user?.id).subscribe({
                next: (res) => {
                    this.usuariosDataSource = res.users;
                },
                error: (error) => {
                    console.error(error);
                },
            })
        );
    }

    /**
     * Obtiene permisos todos creados.
     * @returns {void}
     */
    getPermisos(): void {
        this.subscriptions.add(
            this.httpService.getPermisos().subscribe({
                next: (res) => {
                    this.permisos = res.permissions;
                },
                error: (error) => {
                    console.error(error);
                },
            })
        );
    }

    /**
     * Actualiza los permisos de un usuario.
     *
     * @param user El usuario cuyos permisos se actualizarán.
     * @param permission El permiso que se actualizará.
     * @param e El evento que activó la actualización.
     */
    updatePermissions(user: User, permission: any, e: any): void {
        const i = user.user_permissions.findIndex(
            (element: any) => element.id == permission.id
        );
        if (e.checked) {
            if (i == -1) {
                user.user_permissions.push(permission);
            }
        } else {
            if (i != -1) {
                user.user_permissions.splice(i, 1);
            }
        }
        const params = { user_id: user.id, permissions: user.user_permissions };
        this.httpService.updatePermisosUsuarios(params).subscribe({
            next: (res) => {
                this.notificationsService.openSnackBar(
                    res.msg,
                    'right',
                    'bottom',
                    5000,
                    'success'
                );
            },
            error: (error) => {
                // Manejar el error aquí
                console.error(error);
                this.notificationsService.openSnackBar(
                    error.error.detail,
                    'right',
                    'bottom',
                    5000,
                    'danger'
                );
            },
        });
    }

    /**
     * Verifica si un usuario tiene un permiso específico.
     * @param {User} user El usuario.
     * @param permission El permiso.
     * @returns {boolean} Verdadero si el usuario tiene el permiso, falso en caso contrario.
     */
    getPermission = (user: any, permission: any): boolean => {
        const userPermissions = new Map(
            user.user_permissions.map((p: any) => [p.id, p])
        );
        return userPermissions.has(permission.id);
    };

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
