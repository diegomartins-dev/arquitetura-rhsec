import { Routes } from '@angular/router';

import { authGuard } from './modules/auth/guards/auth.guard';
import { NotFoundPageComponent } from './shared/pages/not-found/not-found.component';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'auth/login'
	},
	{
		path: 'dashboard',
		loadComponent: () =>
			import('./modules/dashboard/layout/dashboard.layout.component').then((m) => m.DashboardLayoutComponent),
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'home'
			},
			{
				path: 'home',
				loadComponent: () =>
					import('./modules/dashboard/home/pages/home.page.component').then((m) => m.HomePageComponent),
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
