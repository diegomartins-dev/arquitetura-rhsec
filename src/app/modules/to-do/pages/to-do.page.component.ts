import { Component } from '@angular/core';
import { ToDoComponent } from '../containers/to-do/to-do.component';
import { HomeLayoutComponent } from '../../../shared/templates/home/home.layout.component';

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
export class ToDoPageComponent {}
