import { User } from '@stack/models';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthFacade, AuthService } from '@stack/auth';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import * as AuthActions from '@stack/auth';
import { LogoComponent } from '../logo/logo.component';
import { SearchComponent } from '../search/search.component';
import { RightNavComponent } from '../right-nav/right-nav.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'stack-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    LogoComponent,
    SearchComponent,
    RightNavComponent,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private authFacade: AuthFacade
  ) {}
  user$: Observable<User | null> = this.authFacade.userInSession$;
  loggedIn$: Observable<boolean> = this.authFacade.loggedIn$;

  onLogin() {
    this.router.navigate(['/login']);
  }

  onLogout() {
    this.authFacade.dispatch(AuthActions.logout());
  }

  onSignUp() {
    this.router.navigate(['/signup']);
  }

  ngOnInit(): void {}
}
