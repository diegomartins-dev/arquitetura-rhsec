import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
	selector: 'app-not-found-page',
	standalone: true,
	imports: [MatButton],
	templateUrl: './not-found.component.html',
	styleUrl: './not-found.component.scss'
})
export class NotFoundPageComponent {
	location = inject(Location);

	goBack() {
		this.location.back();
	}
}
