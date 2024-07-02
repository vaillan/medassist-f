/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FileService } from './file.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Login } from '../core/interfaces/login';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Options } from '../core/constant/http-options';
import { NotificationsService } from '@myorg/snackbar-notifications';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    BaseUrl: string = environment.API;
    constructor(
        private http: HttpClient,
        private fileService: FileService,
        private sanitizer: DomSanitizer,
        private notificationsService: NotificationsService
    ) {}

    /**
     * Inicia sesión con un usuario.
     *
     * @param loginData Los datos de inicio de sesión.
     * @returns Un observable con la respuesta del servidor.
     */
    login(loginData: Login): Observable<any> {
        const options = Options;
        const route = `${this.BaseUrl}/login_session`;
        return this.http.post(route, loginData, options).pipe(
            map((data) => {
                return data;
            }),
            catchError((error) => {
                this.notificationsService.openSnackBar(
                    error.error.detail,
                    'right',
                    'bottom',
                    9000,
                    'danger'
                );
                return throwError(() => error);
            })
        );
    }

    /**
     * Cierra la sesión del usuario.
     *
     * @param data Los datos necesarios para cerrar la sesión.
     * @returns Un observable con la respuesta del servidor.
     */
    logOut(data: object): Observable<any> {
        const options = Options;
        const route = `${this.BaseUrl}/logout_session`;
        return this.http.post(route, data, options).pipe(
            map((data) => {
                return data;
            }),
            catchError((error) => {
                this.notificationsService.openSnackBar(
                    error.error.detail,
                    'right',
                    'bottom',
                    9000,
                    'danger'
                );
                return throwError(() => error);
            })
        );
    }

    /**
     * Obtiene todos los usuarios.
     *
     * @returns Un observable con los usuarios.
     */
    getUsers(): Observable<any> {
        const options = Options;
        const route = `${this.BaseUrl}/get_users`;
        return this.http.get(route, options).pipe(
            map((data) => {
                return data;
            }),
            catchError((error) => {
                this.notificationsService.openSnackBar(
                    error.error.detail,
                    'right',
                    'bottom',
                    9000,
                    'danger'
                );
                return throwError(() => error);
            })
        );
    }

    /**
     * Obtiene los puestos disponibles.
     *
     * @returns Un observable con los puestos.
     */
    getPuestos(): Observable<any> {
        const options = Options;
        const route = `${this.BaseUrl}/get_puestos`;
        return this.http.get(route, options).pipe(
            map((data) => {
                return data;
            }),
            catchError((error) => {
                this.notificationsService.openSnackBar(
                    error.error.detail,
                    'right',
                    'bottom',
                    9000,
                    'danger'
                );
                return throwError(() => error);
            })
        );
    }

    /**
     * Obtiene grupos disponibles.
     * @returns {Observable}
     */
    getGrupos(): Observable<any> {
        const options = Options;
        const route = `${this.BaseUrl}/get_grupos`;
        return this.http.get(route, options).pipe(
            map((data) => {
                return data;
            }),
            catchError((error) => {
                this.notificationsService.openSnackBar(
                    error.error.detail,
                    'right',
                    'bottom',
                    9000,
                    'danger'
                );
                return throwError(() => error);
            })
        );
    }

    /**
     * Crea un nuevo usuario.
     *
     * @param params Los datos del usuario a crear.
     * @returns Un observable con la respuesta del servidor.
     */
    createUser(params: object): Observable<any> {
        const options = Options;
        const route = `${this.BaseUrl}/create_user`;
        return this.http.post(route, params, options).pipe(
            map((data) => {
                return data;
            }),
            catchError((error) => {
                this.notificationsService.openSnackBar(
                    error.error.detail,
                    'right',
                    'bottom',
                    9000,
                    'danger'
                );
                return throwError(() => error);
            })
        );
    }

    /**
     * Actualiza el token de acceso.
     *
     * @param data Los datos necesarios para actualizar el token.
     * @returns Un observable con la respuesta del servidor.
     */
    refreshToken(data: object): Observable<any> {
        const options = Options;
        const route = `${this.BaseUrl}/refresh`;
        return this.http.post(route, data, options).pipe(
            map((data) => {
                return data;
            }),
            catchError((error) => {
                this.notificationsService.openSnackBar(
                    error.error.detail,
                    'right',
                    'bottom',
                    9000,
                    'danger'
                );
                return throwError(() => error);
            })
        );
    }

    /**
     * Obtiene los usuarios creados por un usuario específico.
     *
     * @param user_id El ID del usuario creador.
     * @returns Un observable con los usuarios.
     */
    getUsuariosPorCreador(user_id: number | undefined): Observable<any> {
        const options = Options;
        const route = `${this.BaseUrl}/get_users_by_creator/${user_id}`;
        return this.http.get(route, options).pipe(
            map((data) => {
                return data;
            }),
            catchError((error) => {
                this.notificationsService.openSnackBar(
                    error.error.detail,
                    'right',
                    'bottom',
                    9000,
                    'danger'
                );
                return throwError(() => error);
            })
        );
    }

    /**
     * Edita un usuario.
     *
     * @param params Los datos del usuario a editar.
     * @returns Un observable con la respuesta del servidor.
     */
    editUser(params: object): Observable<any> {
        const options = Options;
        const route = `${this.BaseUrl}/update_user`;
        return this.http.put(route, params, options).pipe(
            map((data) => {
                return data;
            }),
            catchError((error) => {
                this.notificationsService.openSnackBar(
                    error.error.detail,
                    'right',
                    'bottom',
                    9000,
                    'danger'
                );
                return throwError(() => error);
            })
        );
    }

    /**
     * Obtiene un usuario.
     *
     * @param user_id El ID del usuario a obtener.
     * @returns Un observable con el usuario.
     */
    getUsuario(user_id: number): Observable<any> {
        const options = Options;
        const route = `${this.BaseUrl}/get_user/${user_id}`;
        return this.http.get(route, options).pipe(
            map((data) => {
                return data;
            }),
            catchError((error) => {
                this.notificationsService.openSnackBar(
                    error.error.detail,
                    'right',
                    'bottom',
                    9000,
                    'danger'
                );
                return throwError(() => error);
            })
        );
    }

    /**
     * Elimina un usuario.
     *
     * @param user_id El ID del usuario a eliminar.
     * @returns Un observable con la respuesta del servidor.
     */
    deleteUser(user_id: number): Observable<any> {
        const options = Options;
        const route = `${this.BaseUrl}/delete_user/${user_id}`;
        return this.http.delete(route, options).pipe(
            map((data) => {
                return data;
            }),
            catchError((error) => {
                this.notificationsService.openSnackBar(
                    error.error.detail,
                    'right',
                    'bottom',
                    9000,
                    'danger'
                );
                return throwError(() => error);
            })
        );
    }

    /**
     * Obtiene los permisos del usuario.
     *
     * @returns Un observable con los permisos.
     */
    getPermisos(): Observable<any> {
        const options = Options;
        const route = `${this.BaseUrl}/get_permissions`;
        return this.http.get(route, options).pipe(
            map((data) => {
                return data;
            }),
            catchError((error) => {
                this.notificationsService.openSnackBar(
                    error.error.detail,
                    'right',
                    'bottom',
                    9000,
                    'danger'
                );
                return throwError(() => error);
            })
        );
    }

    /**
     * Actualiza permisos del usuario
     * @param {object} params
     * @returns {Observable}
     */
    updatePermisosUsuarios(params: object): Observable<any> {
        const options = Options;
        const route = `${this.BaseUrl}/update_user_permissions`;
        return this.http.put(route, params, options).pipe(
            map((data) => {
                return data;
            }),
            catchError((error) => {
                this.notificationsService.openSnackBar(
                    error.error.detail,
                    'right',
                    'bottom',
                    9000,
                    'danger'
                );
                return throwError(() => error);
            })
        );
    }

    /**
     * Actualiza los permisos de los grupos.
     *
     * @param params Los datos de los permisos a actualizar.
     * @returns Un observable con la respuesta del servidor.
     */
    updatePermisosGrupos(params: object): Observable<any> {
        const options = Options;
        const route = `${this.BaseUrl}/update_group_permissions`;
        return this.http.put(route, params, options).pipe(
            map((data) => {
                return data;
            }),
            catchError((error) => {
                this.notificationsService.openSnackBar(
                    error.error.detail,
                    'right',
                    'bottom',
                    9000,
                    'danger'
                );
                return throwError(() => error);
            })
        );
    }

}
