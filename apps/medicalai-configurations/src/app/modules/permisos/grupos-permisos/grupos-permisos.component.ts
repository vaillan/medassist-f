/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Groups } from '../../../core/interfaces/groups';
import { HttpService } from '../../../services/http.service';
import { Subscription } from 'rxjs';
import { NotificationsService } from '@myorg/snackbar-notifications';
import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';

@Component({
    selector: 'app-grupos-permisos',
    templateUrl: './grupos-permisos.component.html',
    styleUrl: './grupos-permisos.component.scss',
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
export class GruposPermisosComponent implements OnInit, OnDestroy {
    subscriptions: Subscription;
    groupsDataSource!: Groups[];
    displayedColumnsGroups: string[];
    columnsToDisplayWithExpand: string[];
    permisos!: Array<any>;
    expandedElement: any;

    constructor(
        private httpService: HttpService,
        private notificationsService: NotificationsService
    ) {
        this.subscriptions = new Subscription();
        this.displayedColumnsGroups = ['id', 'name'];
        this.columnsToDisplayWithExpand = [
            ...this.displayedColumnsGroups,
            'expand',
        ];
    }

    ngOnInit(): void {
        this.getPermisos();
        this.getGrupos();
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
     * Obtiene los grupos disponibles.
     * @returns {void}
     */
    getGrupos(): void {
        this.subscriptions.add(
            this.httpService.getGrupos().subscribe({
                next: (res) => {
                    this.groupsDataSource = res.grupos;
                    console.log(this.groupsDataSource);
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
    updatePermissions(group: any, permission: any, e: any): void {
        const i = group.permissions.findIndex(
            (element: any) => element.id == permission.id
        );
        if (e.checked) {
            if (i == -1) {
                group.permissions.push(permission);
            }
        } else {
            if (i != -1) {
                group.permissions.splice(i, 1);
            }
        }
        const params = { group_id: group.id, permissions: group.permissions };
        this.httpService.updatePermisosGrupos(params).subscribe({
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
            },
        });
    }

    /**
     * Verifica si un usuario tiene un permiso específico.
     * @param {object} group El usuario.
     * @param permission El permiso.
     * @returns {boolean} Verdadero si el usuario tiene el permiso, falso en caso contrario.
     */
    getPermission = (group: any, permission: any): boolean => {
        const groupPermissions = new Map(
            group.permissions.map((p: any) => [p.id, p])
        );
        return groupPermissions.has(permission.id);
    };

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
