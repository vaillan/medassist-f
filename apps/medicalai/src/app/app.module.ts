import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '@myorg/material';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LayoutModule } from '@myorg/general-layout';

import { MarkdownModule } from 'ngx-markdown';
import { SnackbarNotificationsModule } from '@myorg/snackbar-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
    declarations: [AppComponent, LayoutComponent,],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        MarkdownModule.forRoot(),
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        BreadcrumbModule,
        FontAwesomeModule,
        LayoutModule,
        SnackbarNotificationsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
