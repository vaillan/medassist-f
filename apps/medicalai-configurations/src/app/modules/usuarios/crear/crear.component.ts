/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from '../../../services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShareService } from '../../../services/share.service';
import { NotificationsService } from '@myorg/snackbar-notifications';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss'],
})
export class CrearComponent implements OnInit, OnDestroy {
  createUserForm: FormGroup = new FormGroup({});
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
    this.subscriptions = new Subscription();
    this.subscriptions.add(
      this.shareService.currentUser$.subscribe((user) => (this.user = user))
    );
    this.hide = true;
    this.createUserForm = this.fb.group({
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
      is_staff: [true, Validators.required],
      is_superuser: [this.isAdmin, Validators.required],
      groups: [null, Validators.required],
      created_by: [this.user.id, Validators.required],
      updated_by: [this.user.id, Validators.required],
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
      password: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getPuestos();
    this.getGrupos();
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
    this.createUserForm.patchValue({
      is_superuser: this.isAdmin,
    });
  }

  onSubmit(): void {
    console.log(this.createUserForm.value);
    this.subscriptions.add(
      this.httpService.createUser(this.createUserForm.value).subscribe({
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
