/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterContentChecked, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../services/theme.service';
import { ShareService } from '../services/share.service';
import { HttpService } from '../services/http.service';
import { MenuService } from '../services/menu.service';
import { Subscription } from 'rxjs';
export interface NavItem {
	title: string;
	link?: string;
	icon?: string;
	child?: NavItem[];
}
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements AfterContentChecked, OnDestroy {
  showFiller = false;
	nav!: NavItem[];
	theme: any;
	sidebarTitle: string;
	subscriptions: Subscription;

	constructor(
		private router: Router,
		private themeService: ThemeService,
		public sharedService: ShareService,
		private changeDetectorRef: ChangeDetectorRef,
		private httpService: HttpService,
		private menuService: MenuService,
	) {
		this.subscriptions = new Subscription();
		this.sidebarTitle = "Menu";
		this.setMenu();
		this.theme = this.themeService.currentThemeMode;
		this.subscriptions.add(
			this.sharedService.currentUser$.subscribe(user => {
				this.sidebarTitle = "@"+user?.username;
			})
		);
	}

	ngAfterContentChecked(): void {
		this.changeDetectorRef.detectChanges();
	}

	private setMenu(): void {
		this.menuService.setMenu();
		this.menuService.currentMenu$.subscribe(menu => {
			this.nav = menu ? menu : [];
		});
	}

	onThemeChanged(e: any): void {
		this.themeService.setTheme(e);
	}

	logOut(e: boolean): void {
		if (e) {
			this.httpService.logOut({refresh_token: sessionStorage.getItem('refresh_token')}).subscribe({
				next: (res: any) => {},
				error: (error) => {
					console.error(error);
				},
				complete: () => {
					sessionStorage.removeItem('token');
					sessionStorage.removeItem('refresh_token');
					sessionStorage.removeItem('user');
					this.sharedService.changeStatusLogged(false);
					this.sharedService.changeCurrentUser(null);
					this.setMenu();
					this.router.navigate(['/med']);
				}
			});
		}
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
