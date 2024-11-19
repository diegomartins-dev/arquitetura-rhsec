import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiService } from '../../../core/repository/api.service';
import { IAuth } from '../interfaces/auth.interface';

export interface IReturn {
	status: 'success' | 'error';
	message?: string;
}

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	apiService = inject(ApiService<IAuth>);

	constructor() {}

	login(email: string, password: string): Observable<IReturn> {
		try {
			return this.apiService
				.list('users', { attr: 'email', value: email })
				.pipe(
					map((res) => {
						if (res[0].email === email && res[0].password === password)
							return { status: 'success', message: 'Login realizado com sucesso' };
						throw new Error('Email ou senha inválidos') as any;
					})
				)
				.pipe(
					catchError((err) => throwError(() => ({ status: 'error', message: err.message }))) as any
				) as Observable<IReturn>;
		} catch (e) {
			return throwError(() => ({ status: 'error', message: 'Erro ao tentar fazer o login' })) as Observable<IReturn>;
		}
	}
}
