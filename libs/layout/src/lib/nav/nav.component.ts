/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

export interface NavItem {
  title: string;
  link?: string;
  icon?: string;
  child?: NavItem[];
}

@Component({
  selector: 'monorepo-v-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  @Output() themeChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() logOutChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() set themeMode(_themeMode: any) {
    this.mode = _themeMode;
  }
  @Input() navItems!: NavItem[];
  @Input() sidenavTitle = "Portfolio";
  @Input() headerTitle = "Welcome";
  @Input() isLogged!: boolean | null;
  @Input() whatsappButtonActivated: boolean = true;
  @Input() opened: boolean = false;
  @Input() vissibleSinavWithLoggStatus: boolean = false;
  @Input() loginRoute!: string;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  mode: string | null | undefined;
  get t(): any {
    return this.mode;
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) { }

  onThemeChanged(e: any) {
    this.themeChange.emit(e);
  }

  logOut(e: boolean) {
    this.logOutChange.emit(e);
  }
}
