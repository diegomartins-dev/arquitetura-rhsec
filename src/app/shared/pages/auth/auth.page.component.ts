import { Component } from '@angular/core';

import { LoginComponent } from '../../../modules/auth/containers/login/login.component';

@Component({
	selector: 'app-home-page',
	standalone: true,
	imports: [LoginComponent],
	template: ` <app-login></app-login> `
})
export class AuthPageComponent {}
