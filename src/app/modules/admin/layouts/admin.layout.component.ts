import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminTemplateComponent } from '../../../shared/templates/admin/admin.template.component';

@Component({
	selector: 'app-admin-layout',
	standalone: true,
	imports: [AdminTemplateComponent, RouterOutlet],
	template: `
		<app-admin-template>
			<router-outlet></router-outlet>
		</app-admin-template>
	`
})
export class AdminLayoutComponent {}
