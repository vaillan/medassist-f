/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { ShareService } from './share.service';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface NavItem {
  title: string;
  link?: string;
  icon?: string;
  child?: NavItem[];
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menu = new BehaviorSubject<NavItem[] | null>([]);
  currentMenu$ = this.menu.asObservable();

  constructor(
    private sharedService: ShareService,
    private http: HttpClient,
  ) { }

  setMenu(): void {
    this.sharedService.isLogged$.subscribe(status => {
      this.http.get('assets/json/menu.json').pipe(
        map((data: any) => {
          const user = JSON.parse(sessionStorage.getItem('user') || '{}');
          let menu = null;
          if (status && user) {
            menu = user.is_staff ? data.on_session_admin : data.on_session_classic;
          } else {
            menu = data.off_session;
          }
          return menu;
        })
      ).subscribe({
        next: (menu: NavItem[]) => {
          this.changeCurrentMenu(menu);
        },
        error: (error: any) => { console.error(error); },
      });

    });
  }

  public changeCurrentMenu(value: any) {
    this.menu.next(value);
  }
}
