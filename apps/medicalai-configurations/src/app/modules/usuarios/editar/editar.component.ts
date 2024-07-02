/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from '../../../services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShareService } from '../../../services/share.service';
import { NotificationsService } from '@myorg/snackbar-notifications';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
})
export class EditarComponent implements OnInit, OnDestroy {
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
    private notificationService: NotificationsService,
    private route: ActivatedRoute,
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
      nombre_relacion_contacto_emergencia: [null, Validators.nullValidator],
      numero_telefono_contacto_emergencia: [null, Validators.nullValidator],
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
      this.shareService.currentUser$.subscribe((user) => (this.user = user))
    );
    this.hide = true;
  }

  ngOnInit(): void {
    this.getPuestos();
    this.getGrupos();
    const userIdParam = +Number(this.route.snapshot.paramMap.get('id'));
    if(userIdParam) {
      this.subscriptions.add(
        this.httpService.getUsuario(userIdParam).subscribe({
          next: (res) => {
            this.setEditForm(res.user);
          },
          error: (error) => {
            console.error(error);
          }
        })
      );
    }
  
  }

  getPuestos(): void {
    this.subscriptions.add(
      this.httpService.getPuestos().subscribe({
        next: (res) => {
          this.puestosDataSource = res.puestos;
        },
        error: (error) => {
          console.error(error);
        },
      })
    );
  }

  getGrupos(): void {
    this.subscriptions.add(
      this.httpService.getGrupos().subscribe({
        next: (res) => {
          this.gruposDataSource = res.grupos;
        },
        error: (error) => {
          console.error(error);
        },
      })
    );
  }

  onGrupoSelectChange(e: any): void {
    const i = this.gruposDataSource.findIndex((grupo) => grupo.id == e.value);
    this.isAdmin = this.gruposDataSource[i].name === 'Admin' ? true : false;
    this.editUserForm.patchValue({
      is_superuser: this.isAdmin,
    });
  }

  onSubmit(): void {
    console.log(this.editUserForm.value);
    this.subscriptions.add(
      this.httpService.editUser(this.editUserForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.notificationService.openSnackBar(res.msg, 'right', 'bottom', 5000);
        },
        error: (error) => {
          console.error(error);
        },
      })
    );
  }

  setEditForm(userData: any){
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
      nombre_relacion_contacto_emergencia: userData?.nombre_relacion_contacto_emergencia,
      numero_telefono_contacto_emergencia: userData?.numero_telefono_contacto_emergencia,
      alergias: userData?.alergias,
      medicamentos_recetados: userData?.medicamentos_recetados,
      condiciones_medicas_preexistentes: userData?.condiciones_medicas_preexistentes,
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
      created_by: userData?.created_by??this.user?.id,
      updated_by: this.user?.id,
      email: userData?.email,
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
