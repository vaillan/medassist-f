import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormBuilder } from '@angular/forms';
import { ShareService } from '../../services/share.service';
import { NotificationsService } from '@myorg/snackbar-notifications';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit {
    constructor(
        private httpService: HttpService,
        private fb: FormBuilder,
        private shareService: ShareService,
        private notificationService: NotificationsService,
        private route: ActivatedRoute,
    ) {

    }

    ngOnInit(): void {
        null
    }
}
