import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private theme = new BehaviorSubject('light');
  currentThemeMode = this.theme.asObservable();

  public setTheme(theme:string) {
    this.theme.next(theme);
  }
}
