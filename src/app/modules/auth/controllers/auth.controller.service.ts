import { inject, Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { NotificationService } from '../../../shared/components/notification/notification.service';
import { IAuth } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthControllerService {
	router = inject(Router);
	notificationService = inject(NotificationService);
	authService = inject(AuthService);

	constructor() {}

	login(cpf: FormControl | null, password: FormControl | null) {
		if (cpf?.invalid || password?.invalid) {
			this.notificationService.error('CPF ou senha inválidos');
		} else {
			this.authService.login(cpf?.value, password?.value).subscribe({
				next: (res) => {
					if (res.status !== 'success') {
						this.notificationService.error(res.message || 'Erro ao tentar fazer o login');
						return;
					} else if (res.data !== undefined) {
						const { id, name, email, role } = res.data;
						this.setUserLogged({ id, name, email, role });
						this.router.navigateByUrl('/admin');
						this.notificationService.success(res.message || 'Login realizado com sucesso');
					}
				},

				error: (err) => {
					this.notificationService.error(err.message || 'Erro ao tentar fazer o login');
				}
			});
		}
	}

	setUserLogged(user: Omit<IAuth, 'password'>) {
		sessionStorage.setItem('user', JSON.stringify(user));
	}

	getUserLogged() {
		return JSON.parse(sessionStorage.getItem('user') || '{}');
	}

	logout() {
		sessionStorage.removeItem('user');
		this.router.navigateByUrl('/auth/login');
	}

	isAuthorized(role: string) {
		return this.getUserLogged().role === role ? true : false;
	}
}
