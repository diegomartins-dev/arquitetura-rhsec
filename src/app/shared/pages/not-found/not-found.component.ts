import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'app-not-found-page',
	standalone: true,
	imports: [ButtonModule],
	templateUrl: './not-found.component.html',
	styleUrl: './not-found.component.scss'
})
export class NotFoundPageComponent {
	location = inject(Location);

	goBack() {
		this.location.back();
	}
}
