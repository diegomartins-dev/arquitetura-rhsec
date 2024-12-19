import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiService } from '../../../core/repository/api.service';
import { IAuth } from '../interfaces/auth.interface';
import { HttpService } from '../../../core/http/http.service';
import { HttpClient, HttpClientModule, HttpContext, HttpHandler } from '@angular/common/http';
import { IProvider } from '../../../core/interface/iprovider.interface';

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

	login(cpf: string, password: string): Observable<IReturn> {
		try {
			return this.apiService
				.list('users', { attr: 'cpf', value: cpf })
				.pipe(
					map((res) => {
						console.log(res[0], cpf)
						if (res[0] && res[0]?.cpf === cpf && res[0]?.password === password)
							return { status: 'success', message: 'Login realizado com sucesso', data: res[0] };
						throw new Error('');
					})
				)
				.pipe(this.apiService.returnCatchError('CPF ou senha inválidos')) as Observable<IReturn>;
		} catch (e) {
			return this.apiService.returnThrowError('Aconteceu algum erro ao tentar fazer o login');
		}
	}

	getUser(id: string) {
		return this.apiService
			.getById('users', id)
			.pipe(map((res) => res))
			.pipe(catchError(() => throwError(() => ({ id: '', name: '', email: '', password: '', role: '' }))));
	}
}
