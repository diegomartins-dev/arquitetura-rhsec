import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardTemplateComponent } from '../../../shared/templates/dashboard/dashboard.template.component';

@Component({
	selector: 'app-dashboard-layout',
	standalone: true,
	imports: [DashboardTemplateComponent, RouterOutlet],
	template: `
		<app-dashboard-template>
			<router-outlet></router-outlet>
		</app-dashboard-template>
	`
})
export class DashboardLayoutComponent {}
