import { Component, HostBinding, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'medical AI Configurations';
    isDark = false;
    @HostBinding('class')
    get themeMode() {
        return this.isDark ? 'dark-theme' : '';
    }

    constructor(private themeService: ThemeService) {
        this.themeService.currentThemeMode.subscribe((mode) => {
            this.isDark = mode == 'dark' ? true : false;
        });
    }

    ngOnInit(): void {
        this.themeService.setTheme('dark');
    }
}
