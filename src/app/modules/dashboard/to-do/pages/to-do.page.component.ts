import { Component } from '@angular/core';

import { ToDoComponent } from '../containers/to-do/to-do.component';

@Component({
	selector: 'app-to-do-page',
	standalone: true,
	imports: [ToDoComponent],
	template: `
		<app-to-do></app-to-do>
	`
})
export class ToDoPageComponent {}
