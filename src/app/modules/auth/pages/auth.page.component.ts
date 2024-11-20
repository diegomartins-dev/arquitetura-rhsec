import { Component } from '@angular/core';

import { LoginComponent } from '../../../modules/auth/containers/login/login.component';

@Component({
	selector: 'app-auth-page',
	standalone: true,
	imports: [LoginComponent],
	providers: [],
	template: ` <app-login></app-login> `
})
export class AuthPageComponent {}
