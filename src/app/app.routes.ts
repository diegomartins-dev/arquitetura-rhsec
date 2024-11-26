import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './shared/pages/not-found/not-found.component';
import { authGuard } from './modules/auth/guards/auth.guard';
import { AuthControllerService } from './modules/auth/controllers/auth.controller.service';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'auth/login'
	},
	{
		path: 'dashboard',
		loadComponent: () => import('./modules/to-do/pages/to-do.page.component').then((m) => m.ToDoPageComponent),
		providers: [AuthControllerService],
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'home'
			},
			{
				path: 'home',
				loadComponent: () => import('./modules/to-do/containers/to-do/to-do.component').then((m) => m.ToDoComponent),
				canActivate: [authGuard]
			},
			{
				path: '**',
				component: NotFoundPageComponent,
				canActivate: [authGuard]
			}
		]
	},
	{
		path: 'auth',
		loadComponent: () => import('./modules/auth/pages/auth.page.component').then((m) => m.AuthPageComponent),
		providers: [AuthControllerService],
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'login'
			},
			{
				path: 'login',
				loadComponent: () => import('./modules/auth/containers/login/login.component').then((m) => m.LoginComponent)
			}
		]
	},
	{
		path: '**',
		component: NotFoundPageComponent
	}
];
