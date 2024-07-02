import { Component } from '@angular/core';
import { ShareService } from '../../services/share.service';

@Component({
  selector: 'app-med',
  templateUrl: './med.component.html',
  styleUrl: './med.component.scss'
})
export class MedComponent {
  constructor(public shareService: ShareService) {}
}
