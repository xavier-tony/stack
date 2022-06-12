import { Routes } from "@angular/router";
import { LogoutComponent } from './logout.component';

export const logoutRoutes: Routes = [{
	path: '', pathMatch: 'full', component: LogoutComponent
}]
