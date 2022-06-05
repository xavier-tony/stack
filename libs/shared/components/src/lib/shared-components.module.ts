import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FooterComponent } from './footer/footer.component';

import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './logo/logo.component';
import { RightNavComponent } from './right-nav/right-nav.component';
import { SearchComponent } from './search/search.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { AuthModule } from '@stack/auth';
import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    AuthModule,
    CommonModule
    // ReactiveFormsModule,
  ],
  exports: [HeaderComponent, FooterComponent, MainContainerComponent],
  declarations: [
    RightNavComponent,
    SearchComponent,
    LogoComponent,
    HeaderComponent,
    FooterComponent,
    MainContainerComponent,
  ],
  providers: [],
})
export class SharedComponentsModule {}
