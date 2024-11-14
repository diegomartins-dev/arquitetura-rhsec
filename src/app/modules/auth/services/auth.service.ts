import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';

export interface IReturn {
	status: 'success' | 'error';
	message?: string;
}

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor() {}

	login(email: string, password: string): Observable<IReturn> {
		try {
			if (email === 'admin@email.com' && password === '123')
				return from<IReturn[]>([{ status: 'success', message: 'Login realizado com sucesso' }]);
			else return throwError({ status: 'error', message: 'Email ou senha inválidos' });
		} catch (e) {
			return from<IReturn[]>([{ status: 'error', message: 'Erro ao tentar fazer o login' }]);
		}
	}
}
