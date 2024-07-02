import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { MaterialModule } from '@myorg/material';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { WhatsAppModule } from '@myorg/whats-app';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule, WhatsAppModule],
  declarations: [
    NavComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    BreadcrumbComponent,
  ],
  exports: [
    NavComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    BreadcrumbComponent,
  ],
})
export class LayoutModule {}
