import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-auth-page',
	standalone: true,
	imports: [RouterOutlet],
	providers: [],
	template: ` <router-outlet></router-outlet> `
})
export class AuthPageComponent {}
