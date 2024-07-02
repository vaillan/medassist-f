/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../core/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  private logged = new BehaviorSubject<boolean>(sessionStorage.getItem('token')? true: false);
  isLogged$ = this.logged.asObservable();

  private user = new BehaviorSubject<User | null>(JSON.parse(sessionStorage.getItem('user') || '{}'));
  currentUser$ = this.user.asObservable();

  public changeStatusLogged(value: boolean) {
    this.logged.next(value);
  }

  public changeCurrentUser(value: any) {
    this.user.next(value);
  }
}
