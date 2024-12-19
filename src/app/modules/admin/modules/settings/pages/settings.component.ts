import { Component } from '@angular/core';
import { SettingsComponent } from '../containers/settings.component';

@Component({
	selector: 'app-settings-page',
	standalone: true,
	imports: [SettingsComponent],
	template: `
		<app-settings />
	`
})
export class SettingsPageComponent {}
