/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'monorepo-v-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Output() switchMode:EventEmitter<string | null | undefined> = new EventEmitter<string | null | undefined>();
  @Input() set themeMode(_themeMode: string | null | undefined) {
    this.icon = _themeMode === "dark" ? "wb_sunny" : "mode_night";
    this.tooltipMode = _themeMode === "dark" ? "Light Mode": "Dark mode";
  }

  icon: string | null | undefined;
  tooltipMode!: string;

  onChangeTheme() {
    this.tooltipMode = this.icon == "wb_sunny" ? 'Light mode' : 'Dark mode';
    this.switchMode.emit(this.icon == "wb_sunny" ? 'light': 'dark');
  }
}
