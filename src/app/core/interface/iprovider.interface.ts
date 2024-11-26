import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export abstract class IProvider<T> {
	abstract getAll(path: string): Observable<any>;

	abstract getById(path: string, id: string): Observable<any>;

	abstract list(path: string, search: { attr: string; value: string }): Observable<any>;

	abstract create(path: string, data: T): Observable<any>;

	abstract update(path: string, id: string, data: T): Observable<any>;

	abstract updateByPatch(path: string, id: string, data: { attr: string; value: any }): Observable<any>;

	abstract deleteAll(path: string): Observable<any>;

	abstract deleteById(path: string, id: string): Observable<any>;
}
