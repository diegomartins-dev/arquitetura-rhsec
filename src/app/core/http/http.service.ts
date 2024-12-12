import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, switchMap } from 'rxjs';

import { IProvider } from '../interface/iprovider.interface';

@Injectable({
	providedIn: 'root'
})
export class HttpService<T> implements IProvider<T> {
	baseUrl = 'http://localhost:3000';

	constructor(private http: HttpClient) {}

	getAll(path: string): Observable<T[]> {
		return this.http.get<T[]>(`${this.baseUrl}/${path}`);
	}

	getById(path: string, id: string): Observable<T> {
		return this.http.get<T>(`${this.baseUrl}/${path}/${id}`);
	}

	list(path: string, search: { attr: string; value: string }): Observable<T[]> {
		return this.http.get<T[]>(`${this.baseUrl}/${path}?${search.attr}=${search.value}`);
	}

	create(path: string, data: T): Observable<T> {
		return this.http.post<T>(`${this.baseUrl}/${path}`, data);
	}

	update(path: string, id: string, data: T): Observable<T> {
		return this.http.put<T>(`${this.baseUrl}/${path}/${id}`, data);
	}

	updateByPatch(path: string, id: string, data: { attr: string; value: any }): Observable<T> {
		return this.http.patch<T>(`${this.baseUrl}/${path}/${id}`, data);
	}

	deleteAll(path: string): Observable<T[]> {
		return this.getAll(path).pipe(switchMap((res) => forkJoin(res.map((item: any) => this.deleteById(path, item.id)))));
	}

	deleteById(path: string, id: string): Observable<T> {
		return this.http.delete<T>(`${this.baseUrl}/${path}/${id}`);
	}
}
