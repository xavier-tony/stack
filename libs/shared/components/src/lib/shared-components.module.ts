import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { LogoComponent } from './logo/logo.component';
import { RightNavComponent } from './right-nav/right-nav.component';
import { SearchComponent } from './search/search.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { AuthModule } from '@stack/auth';
import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { routes } from './routes';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    AuthModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  exports: [MainContainerComponent],
  declarations: [MainContainerComponent, HomeComponent],
  providers: [],
})
export class SharedComponentsModule {}
