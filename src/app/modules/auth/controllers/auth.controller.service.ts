import { inject, Injectable } from '@angular/core';
import { NotificationService } from '../../../shared/components/notification/notification.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthControllerService {
	router = inject(Router);
	notificationService = inject(NotificationService);
	authService = inject(AuthService);

	constructor() {}

	login(email: FormControl | null, password: FormControl | null) {
		if (email?.invalid || password?.invalid) {
			this.notificationService.error('Email ou senha inválidos');
		} else {
			this.authService.login(email?.value, password?.value).subscribe({
				next: (res) => {
					this.notificationService.success(res.message || 'Login realizado com sucesso');
					this.router.navigateByUrl('/dashboard/home');
				},
				error: (err) => {
					this.notificationService.error(err.message || 'Erro ao tentar fazer o login');
				}
			});
		}
	}
}
