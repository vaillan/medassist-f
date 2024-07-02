/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShareService } from '../../services/share.service';
import { NotificationsService } from '@myorg/snackbar-notifications';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrl: './perfil.component.scss',
})
export class PerfilComponent implements OnInit, OnDestroy {
    editUserForm: FormGroup = new FormGroup({});
    subscriptions: Subscription;
    puestosDataSource!: Array<any>;
    gruposDataSource!: Array<any>;
    isAdmin!: boolean;
    hide: boolean;
    user: any;

    constructor(
        private httpService: HttpService,
        private fb: FormBuilder,
        private shareService: ShareService,
        private notificationService: NotificationsService
    ) {
        this.editUserForm = this.fb.group({
            id: [null, Validators.required],
            username: [null, Validators.required],
            first_name: [null, Validators.required],
            last_name: [null, Validators.required],
            direccion: [null, Validators.nullValidator],
            telefono: [null, Validators.nullValidator],
            puesto: [null, Validators.required],
            departamento: [null, Validators.required],
            fecha_contratacion: [null, Validators.nullValidator],
            salario: [null, Validators.nullValidator],
            nombre_relacion_contacto_emergencia: [
                null,
                Validators.nullValidator,
            ],
            numero_telefono_contacto_emergencia: [
                null,
                Validators.nullValidator,
            ],
            alergias: [null, Validators.nullValidator],
            medicamentos_recetados: [null, Validators.nullValidator],
            condiciones_medicas_preexistentes: [null, Validators.nullValidator],
            cobertura_seguro_medico: [null, Validators.nullValidator],
            cobertura_seguro_dental: [null, Validators.nullValidator],
            cobertura_seguro_vision: [null, Validators.nullValidator],
            beneficios_jubilacion: [null, Validators.nullValidator],
            estado_civil: [null, Validators.nullValidator],
            numero_dependientes: [null, Validators.nullValidator],
            educacion: [null, Validators.nullValidator],
            certificaciones: [null, Validators.nullValidator],
            licencias: [null, Validators.nullValidator],
            is_staff: [null, Validators.required],
            is_superuser: [null, Validators.required],
            groups: [null, Validators.required],
            created_by: [null, Validators.required],
            updated_by: [null, Validators.required],
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
            password: [null, Validators.nullValidator],
        });
        this.subscriptions = new Subscription();
        this.subscriptions.add(
            this.shareService.currentUser$.subscribe(
                (user) => (this.user = user)
            )
        );
        this.hide = true;
        this.disbleControls();
    }

    /**
     * Este código deshabilita los controles del formulario de edición de usuario.
     */
    private disbleControls(): void {
        // Deshabilitar los controles del formulario
        this.editUserForm.controls['puesto'].disable();
        this.editUserForm.controls['departamento'].disable();
        this.editUserForm.controls['groups'].disable();
        this.editUserForm.controls['is_staff'].disable();
        this.editUserForm.controls['is_superuser'].disable();
    }

    ngOnInit(): void {
        this.getPuestos();
        this.getGrupos();

        if (this.user) {
            this.setEditForm(this.user);
        }
    }

    /**
     * Este código maneja el envío del formulario de edición de usuario.
     */
    onSubmit(): void {
        // Suscribirse a la llamada a la API
        this.subscriptions.add(
            this.httpService.editUser(this.editUserForm.value).subscribe({
                // Manejar la respuesta exitosa
                next: (res) => {
                    console.log(res);
                    // Mostrar un mensaje de notificación
                    this.notificationService.openSnackBar(
                        res.msg,
                        'right',
                        'bottom',
                        5000
                    );
                },
                // Manejar errores
                error: (error) => {
                    console.error(error);
                },
            })
        );
    }

    /**
     * Obtiene los puestos de la API.
     */
    getPuestos(): void {
        this.subscriptions.add(
            this.httpService.getPuestos().subscribe({
                next: (res) => {
                    this.puestosDataSource = res.puestos;
                },
                error: (error) => {
                    // Manejar el error aquí
                    console.error('Error al obtener puestos:', error);
                },
            })
        );
    }

    /**
     * Este código obtiene los grupos de la API.
     */
    getGrupos(): void {
        // Suscribirse a la llamada a la API
        this.subscriptions.add(
            this.httpService.getGrupos().subscribe({
                // Manejar la respuesta exitosa
                next: (res) => {
                    this.gruposDataSource = res.grupos;
                },
                // Manejar errores
                error: (error) => {
                    console.error(error);
                },
            })
        );
    }

    /**
     * Este código maneja el evento de cambio de selección de grupo.
     */
    onGrupoSelectChange(e: any): void {
        // Buscar el índice del grupo seleccionado en la matriz de grupos
        const i = this.gruposDataSource.findIndex(
            (grupo) => grupo.id == e.value
        );

        // Verificar si el grupo seleccionado es 'Admin'
        this.isAdmin = this.gruposDataSource[i].name === 'Admin' ? true : false;

        // Actualizar el valor de 'is_superuser' en el formulario de edición de usuario
        this.editUserForm.patchValue({
            is_superuser: this.isAdmin,
        });
    }

    /**
     * Este código establece los valores del formulario de edición de usuario.
     */
    setEditForm(userData: any) {
        // Asignar valores al formulario
        this.editUserForm.patchValue({
            id: userData?.id,
            username: userData?.username,
            first_name: userData?.first_name,
            last_name: userData?.last_name,
            direccion: userData?.direccion,
            telefono: userData?.telefono,
            puesto: userData?.puesto,
            departamento: userData?.departamento,
            fecha_contratacion: userData?.fecha_contratacion,
            salario: userData?.salario,
            nombre_relacion_contacto_emergencia:
                userData?.nombre_relacion_contacto_emergencia,
            numero_telefono_contacto_emergencia:
                userData?.numero_telefono_contacto_emergencia,
            alergias: userData?.alergias,
            medicamentos_recetados: userData?.medicamentos_recetados,
            condiciones_medicas_preexistentes:
                userData?.condiciones_medicas_preexistentes,
            cobertura_seguro_medico: userData?.cobertura_seguro_medico,
            cobertura_seguro_dental: userData?.cobertura_seguro_dental,
            cobertura_seguro_vision: userData?.cobertura_seguro_vision,
            beneficios_jubilacion: userData?.beneficios_jubilacion,
            estado_civil: userData?.estado_civil,
            numero_dependientes: userData?.numero_dependientes,
            educacion: userData?.educacion,
            certificaciones: userData?.certificaciones,
            licencias: userData?.licencias,
            is_staff: userData?.is_staff,
            is_superuser: userData?.is_superuser,
            groups: userData?.groups,
            created_by: userData?.created_by ?? this.user?.id,
            updated_by: this.user?.id,
            email: userData?.email,
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
