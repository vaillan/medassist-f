/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, OnDestroy } from '@angular/core';
import { CanMatch, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ShareService } from '../../services/share.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanMatch, OnDestroy {
  isLoggedIn!: boolean;
  subscriptions: Subscription = new Subscription();
  constructor(private shareService: ShareService, private router: Router) {
    this.subscriptions.add(this.shareService.isLogged$.subscribe(isLogged => this.isLoggedIn = isLogged));
  }

  canMatch(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.isLoggedIn) {
      this.router.parseUrl('/med/users');
      return false;
    }
    return true;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
