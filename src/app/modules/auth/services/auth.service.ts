import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiService } from '../../../core/repository/api.service';
import { IAuth } from '../interfaces/auth.interface';

export interface IReturn {
	status: 'success' | 'error';
	message?: string;
	data?: IAuth;
}

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private apiService = inject<ApiService<IAuth>>(ApiService<IAuth>);

	constructor() {}

	login(email: string, password: string): Observable<IReturn> {
		try {
			return this.apiService
				.list('users', { attr: 'email', value: email })
				.pipe(
					map((res) => {
						if (res[0] && res[0].email === email && res[0].password === password)
							return { status: 'success', message: 'Login realizado com sucesso', data: res[0] };
						throw new Error('');
					})
				)
				.pipe(this.apiService.returnCatchError('Email ou senha inválidos')) as Observable<IReturn>;
		} catch (e) {
			return this.apiService.returnThrowError('Aconteceu algum erro ao tentar fazer o login');
		}
	}

	getUser(id: string): Observable<IAuth> {
		return this.apiService
			.getById('users', id)
			.pipe(map((res) => res))
			.pipe(catchError(() => throwError(() => ({ id: '', name: '', email: '', password: '', role: '' }))));
	}
}
