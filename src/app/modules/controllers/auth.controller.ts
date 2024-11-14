import { inject, Injectable } from '@angular/core';
import { NotificationService } from '../../shared/components/notification/notification.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Injectable()
export class AuthController {
	router = inject(Router);
	notificationService = inject(NotificationService);

	constructor() {}

	login(email: FormControl | null, password: FormControl | null) {
		if (email?.invalid || password?.invalid) {
			this.notificationService.error('Email ou senha inválidos');
		} else {
			this.router.navigateByUrl('/dashboard');
		}
	}
}
