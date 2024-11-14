import { Component } from '@angular/core';
import { HomeLayoutComponent } from '../../templates/home/home.layout.component';
import { ToDoComponent } from '../../../modules/to-do/containers/to-do/to-do.component';

@Component({
	selector: 'app-home-page',
	standalone: true,
	imports: [HomeLayoutComponent, ToDoComponent],
	template: `
		<app-home-layout>
			<app-to-do></app-to-do>
		</app-home-layout>
	`
})
export class HomePageComponent {}
