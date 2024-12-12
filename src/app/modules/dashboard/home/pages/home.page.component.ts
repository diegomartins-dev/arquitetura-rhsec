import { Component } from '@angular/core';

import { HomeComponent } from '../container/home.component';

@Component({
	selector: 'app-home-page',
	standalone: true,
	imports: [HomeComponent],
	template: `
		<app-home></app-home>
	`
})
export class HomePageComponent {}
