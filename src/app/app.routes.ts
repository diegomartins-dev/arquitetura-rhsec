import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./modules/to-do-list/pages/to-do/to-do.component').then((m) => m.ListComponent)
	}
];
