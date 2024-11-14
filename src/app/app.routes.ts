import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './shared/pages/not-found/not-found.component';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'auth/login'
	},
	{
		path: 'dashboard',
		loadComponent: () => import('./shared/pages/home/home.page.component').then((m) => m.HomePageComponent),
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'home'
			},
			{
				path: 'home',
				loadComponent: () => import('./modules/to-do/containers/to-do/to-do.component').then((m) => m.ToDoComponent)
			},
			{
				path: '**',
				component: NotFoundPageComponent
			}
		]
	},
	{
		path: 'auth',
		loadComponent: () => import('./shared/pages/auth/auth.page.component').then((m) => m.AuthPageComponent),
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'login'
			},
			{
				path: 'login',
				loadComponent: () => import('./modules/to-do/containers/to-do/to-do.component').then((m) => m.ToDoComponent)
			}
		]
	},
	{
		path: '**',
		component: NotFoundPageComponent
	}
];
