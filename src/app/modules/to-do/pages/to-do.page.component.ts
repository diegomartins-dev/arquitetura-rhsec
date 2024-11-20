import { Component } from '@angular/core';
import { ToDoComponent } from '../containers/to-do/to-do.component';
import { DashboardLayoutComponent } from '../../../shared/templates/dashboard/dashboardlayout.component';

@Component({
	selector: 'app-to-do-page',
	standalone: true,
	imports: [DashboardLayoutComponent, ToDoComponent],
	template: `
		<app-dashboard-layout>
			<app-to-do></app-to-do>
		</app-dashboard-layout>
	`
})
export class ToDoPageComponent {}
