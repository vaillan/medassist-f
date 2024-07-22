import { Component } from '@angular/core';
import { ShareService } from '../../services/share.service';

@Component({
    selector: 'app-med',
    templateUrl: './med.component.html',
    styleUrl: './med.component.scss',
})
export class MedComponent {
    constructor(public shareService: ShareService) {}

    slides = [
        {
            title: 'Diapositiva 1',
            image: 'assets/img/image1.png',
            description: 'Descripción de la diapositiva 1',
        },
        {
            title: 'Diapositiva 2',
            image: 'assets/img/image2.png',
            description: 'Descripción de la diapositiva 2',
        },
        {
            title: 'Diapositiva 3',
            image: 'assets/img/image3.png',
            description: 'Descripción de la diapositiva 3',
        },
        {
            title: 'Diapositiva 4',
            image: 'assets/img/image4.png',
            description: 'Descripción de la diapositiva 3',
        },
    ];
}
