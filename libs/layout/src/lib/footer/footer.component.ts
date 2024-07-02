/* eslint-disable @typescript-eslint/no-inferrable-types */
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, VERSION } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';

@Component({
  selector: 'monorepo-v-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  
  @Input() whatsappButtonActivated: boolean = true;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  version = `v${VERSION.full}`;

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) { }

}
