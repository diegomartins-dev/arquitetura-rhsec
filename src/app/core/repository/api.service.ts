import { Inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { IProvider } from '../interface/iprovider.interface';
import { HttpService } from '../http/http.service';
import { InMemoryService } from '../in-memory/in-memory.service';

@Injectable({
	providedIn: 'root'
})
export class ApiService<T> {
	constructor(public provider: IProvider<any>) {}

	getAll(path: string) {
		return this.provider.getAll(path);
	}

	getById(path: string, id: string) {
		return this.provider.getById(path, id);
	}

	list(path: string, search: { attr: string; value: string }) {
		return this.provider.list(path, search);
	}

	create(path: string, data: T) {
		return this.provider.create(path, data);
	}

	update(path: string, id: string, data: T) {
		return this.provider.update(path, id, data);
	}

	updateByPatch(path: string, id: string, data: { attr: string; value: any }) {
		return this.provider.updateByPatch(path, id, data);
	}

	deleteAll(path: string) {
		return this.provider.deleteAll(path);
	}

	deleteById(path: string, id: string) {
		return this.provider.deleteById(path, id);
	}

	returnCatchError(message: string) {
		return catchError(() => this.returnThrowError(message));
	}

	returnThrowError(message: string) {
		return throwError(() => ({ status: 'error', message: message || 'Aconteceu algum erro' }));
	}
}
