/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, HostListener, Inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'monorepo-v-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy, OnChanges {

  @Output() themeChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() logOutChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() themeMode: string | null | undefined;
  @Input() sidenav: any;
  @Input() drawer: any;
  @Input() headerTitle = "Welcome";
  @Input() isLogged!: boolean | null;
  @Input() set iconMenuMode(listMenuMode: boolean) {
    if (!listMenuMode) {
      this.icon = "sort";
    }
  }
  @Input() loginRoute!: string;

  @Input() vissibleSinavWithLoggStatus!: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  subscriptions: Subscription = new Subscription();

  elem: any;
  icon: string;
  fullScreenIcon: string = "fullscreen";
  toolbarNavIcon: string = "unfold_more_double";
  toolbarNavState: boolean = false;

  validateSidenavWithLogStatus!: boolean | null;

  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:MSFullscreenChange', ['$event'])
  fullscreenmodes(event: any) {
    this.screenMode();
  }
  constructor(
    @Inject(DOCUMENT) private document: any,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.icon = "format_list_bulleted";
  }

  ngOnInit(): void {
    this.screenMode();
    this.elem = document.documentElement;
  }

  ngOnChanges(changes: SimpleChanges): void {

    if(!this.isLogged) {
      this.drawer.close();
    }

    if(this.vissibleSinavWithLoggStatus) {
      this.validateSidenavWithLogStatus = this.isLogged;
    }else {
      this.validateSidenavWithLogStatus = true;
    }
    
  }

  onThemeChange(e: any) {
    this.themeChanged.emit(e);
  }

  fullScreen() {
    this.icon = this.icon == "format_list_bulleted" ? "sort" : "format_list_bulleted";
  }

  logOut(): void {
    this.logOutChange.emit(true);
  }

  screenMode() {
    if (document.fullscreenElement) {
      //fullscreen
      this.fullScreenIcon = "fullscreen_exit";
    } else {
      //not in full screen
      this.fullScreenIcon = "fullscreen";
    }
  }

  screen(e: any): void {
    if (e == "fullscreen_exit") {
      this.closeFullscreen();
    } else {
      if (e == "fullscreen") {
        this.openFullscreen();
      }
    }
  }

  openFullscreen(): void {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

  closeFullscreen(): void {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }

  toolbarNav(e: string) {
    if (e == "unfold_more_double") {
      this.toolbarNavState = true;
      this.toolbarNavIcon = "unfold_less_double";
    } else {
      if (e == "unfold_less_double") {
        this.toolbarNavState = false;
        this.toolbarNavIcon = "unfold_more_double";
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
