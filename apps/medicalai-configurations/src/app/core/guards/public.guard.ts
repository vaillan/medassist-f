/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { CanMatch, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ShareService } from '../../services/share.service';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanMatch {
  isLoggedIn!: boolean;

  constructor(private shareService: ShareService, private router: Router) {
    this.shareService.isLogged$.subscribe(isLogged => this.isLoggedIn = isLogged);
  }

  canMatch(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isLoggedIn) {
      return false;
    }
    return true;
  }

}
