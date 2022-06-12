import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { User } from '@stack/models';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'stack-right-nav',
  templateUrl: './right-nav.component.html',
  styleUrls: ['./right-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  standalone: true,
})
export class RightNavComponent {
  @Input() user: User | null | undefined;
  @Input() loggedIn: boolean | null = false;
  @Output() loginEvent = new EventEmitter<void>();
  @Output() logoutEvent = new EventEmitter<void>();
  @Output() signupEvent = new EventEmitter<void>();

  login() {
    this.loginEvent.emit();
  }

  logout() {
    this.logoutEvent.emit();
  }

  signup() {
    this.signupEvent.emit();
  }
}
