import { inject, Injectable } from '@angular/core';
import { NotificationService } from '../../../shared/components/notification/notification.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { IAuth } from '../interfaces/auth.interface';

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
					if (res.status !== 'success') {
						this.notificationService.error(res.message || 'Erro ao tentar fazer o login');
						return;
					} else if (res.data !== undefined) {
						const { id, name, email, role } = res.data;
						this.notificationService.success(res.message || 'Login realizado com sucesso');
						this.setUserLogged({ id, name, email, role });
						this.router.navigateByUrl('/dashboard/home');
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
