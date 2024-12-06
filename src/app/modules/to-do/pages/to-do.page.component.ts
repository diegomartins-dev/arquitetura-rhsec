import { Component } from '@angular/core';
import { DashboardLayoutComponent } from '../../../shared/templates/dashboard/dashboardlayout.component';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-to-do-page',
	standalone: true,
	imports: [DashboardLayoutComponent, RouterOutlet],
	template: `
		<app-dashboard-layout>
			<router-outlet></router-outlet>
		</app-dashboard-layout>
	`
})
export class ToDoPageComponent {}
