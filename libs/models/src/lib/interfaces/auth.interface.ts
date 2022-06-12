import { LoginInfo } from './login.interface';
import { User } from './user.interface';

export interface AuthState {
  login: LoginInfo | null;
  user: User | null;
  loaded: boolean;
  error?: string | null;
}
