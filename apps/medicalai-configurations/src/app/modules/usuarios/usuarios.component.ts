/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from '../../services/http.service';
import { ShareService } from '../../services/share.service';
import { NotificationsService } from '@myorg/snackbar-notifications';
// import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit, OnDestroy {
    subscriptions: Subscription;
    usuariosDataSource!: Array<any>;
    usuarios!: Array<any>;
    displayedColumns: Array<string>;
    start: number = 0;
    limit: number = 15;
    end: number = this.limit + this.start;
    user: any;

    constructor(
        private httpService: HttpService,
        private shareService: ShareService,
        private notificationsService: NotificationsService
    ) {
        this.subscriptions = new Subscription();
        this.shareService.currentUser$.subscribe((user) => (this.user = user));
        this.usuariosDataSource = [];
        this.displayedColumns = [
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'created_at',
            'edit',
            'delete',
        ];
    }

    ngOnInit(): void {
        if (this.user.is_superuser) {
            this.getUsers();
        } else {
            this.getUsuariosPorCreador(this.user.id);
        }
    }

    /**
     * Obtiene los usuarios del servidor.
     */
    getUsers(): void {
        this.subscriptions.add(
            this.httpService.getUsers().subscribe({
                next: (res) => {
                    this.usuariosDataSource = res.users;
                    this.usuarios = res.users;
                },
            })
        );
    }

    /**
     * Maneja el evento de desplazamiento de la tabla y carga más datos cuando es necesario.
     */
    onTableScroll(e: any): void {
        const tableViewHeight = e.target.offsetHeight; // Altura del área visible
        const tableScrollHeight = e.target.scrollHeight; // Altura total de la tabla
        const scrollLocation = e.target.scrollTop; // Posición de desplazamiento actual

        // Define un búfer para cargar datos antes de llegar al final de la tabla
        const buffer = 200;
        const limit = tableScrollHeight - tableViewHeight - buffer;

        // Verifica si el usuario se ha desplazado cerca del final de la tabla
        if (scrollLocation > limit) {
            let data = this.getTableData(this.start, this.end);
            this.usuariosDataSource = this.usuariosDataSource.concat(data);
            this.updateIndex();
        }
    }

    /**
     * Actualiza los índices de inicio y final para recuperar el siguiente conjunto de datos.
     */
    updateIndex(): void {
        // Establece el índice de inicio como el índice final anterior
        this.start = this.end;
        // Establece el índice final como el límite más el índice de inicio anterior
        this.end = this.limit + this.start;
    }

    /**
     * Devuelve una submatriz de elementos de la matriz de usuarios dentro del rango especificado.
     *
     * @param start Índice inicial del rango (inclusivo)
     * @param end Índice final del rango (exclusivo)
     * @returns Submatriz de elementos de usuario
     */
    getTableData(start: number, end: number): Array<any> {
        // Filtra la matriz de usuarios para obtener los elementos dentro del rango
        return this.usuarios.filter(
            (value, index) => index >= start && index < end
        );
    }

    /**
     * Obtiene los usuarios creados por un usuario específico.
     *
     * @param user_id El ID del usuario creador.
     */
    getUsuariosPorCreador(user_id: number): void {
        this.httpService.getUsuariosPorCreador(user_id).subscribe({
            next: (res) => {
                this.usuariosDataSource = res.users;
                this.usuarios = res.users;
            },
        });
    }

    /**
     * Actualiza la lista de usuarios según el rol del usuario actual.
     */
    refresh(): void {
        if (this.user.is_superuser) {
            this.getUsers();
        } else {
            this.getUsuariosPorCreador(this.user.id);
        }
    }

    /**
     * Elimina un usuario.
     *
     * @param e El ID del usuario a eliminar.
     */
    deleteUser(e: number): void {
        this.subscriptions.add(
            this.httpService.deleteUser(e).subscribe({
                next: (res) => {
                    this.notificationsService.openSnackBar(
                        res.smg,
                        'right',
                        'bottom',
                        5000
                    );
                },
                error: (error) => {
                    console.error(error);
                },
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
