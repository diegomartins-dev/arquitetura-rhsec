import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'auth'
	},
	{
		path: 'dashboard',
		loadComponent: () => import('./modules/to-do/pages/to-do/to-do.component').then((m) => m.ToDoComponent)
	},
	{
		path: 'auth',
		loadComponent: () => import('./modules/auth/pages/login/login.component').then((m) => m.LoginComponent)
	},
	{
		path: '**',
		redirectTo: 'auth'
	}
];
