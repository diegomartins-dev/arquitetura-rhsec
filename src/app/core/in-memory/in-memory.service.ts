import { Injectable } from '@angular/core';
import { from, Observable, OperatorFunction, of } from 'rxjs';
import { IListItem } from '../../modules/to-do/interfaces/i-list-item.interface';
import { IProvider } from '../interface/iprovider.interface';
import { IAuth } from '../../modules/auth/interfaces/auth.interface';

export interface IReturn<T> {
	status: 'success' | 'error';
	message?: string;
	data?: T[];
}

@Injectable({
	providedIn: 'root'
})
export class InMemoryService<T> implements IProvider<T> {
	constructor() {}

	getItemsByStorage() {
		return JSON.parse(localStorage.getItem('list') || '[]');
	}

	setItemsByStorage(items: T[], message?: { success: string; error: string }) {
		localStorage.setItem('list', JSON.stringify(items));
	}

	getAll(path: string) {
		try {
			const items = this.getItemsByStorage();
			return from<T[]>([items]);
		} catch (e) {
			return this.returnThrowError('Erro ao carregar as tarefas');
		}
	}

	getById(path: string, id: string) {
		try {
			const item = this.getItemsByStorage().find((item: IListItem) => item.id === id);
			return from<T[]>([item]);
		} catch (e) {
			return this.returnThrowError('Erro ao carregar as tarefas');
		}
	}

	list(path: string, search: { attr: string; value: string }) {
		try {
			const users: any = [
				{
					id: '1',
					email: 'admin@email.com',
					password: '123456',
					name: 'Admin',
					role: 'admin'
				},

				{
					id: '2',
					email: 'john@email.com',
					password: '123456',
					name: 'John Doe',
					role: 'user'
				}
			];

			const item = users.filter((item: any) => item[search.attr] === search.value);

			return from<T[]>([item]);
		} catch (e) {
			return this.returnThrowError('Erro ao carregar as tarefas');
		}
	}

	create(path: string, newItem: T) {
		try {
			const updated = [...this.getItemsByStorage(), newItem];
			this.setItemsByStorage(updated);
			return of<T[]>([]);
		} catch (e) {
			return this.returnThrowError('Erro ao salvar a tarefa');
		}
	}

	updateByPatch(path: string, id: string, data: { attr: string; value: any }) {
		try {
			const updated = this.getItemsByStorage().map((item: IListItem) => {
				if (item.id === id) {
					return { ...item, [data.attr]: data.value };
				}
				return item;
			});
			this.setItemsByStorage(updated);
			return of<T[]>([]);
		} catch (e) {
			return this.returnThrowError('Erro ao atualizar a tarefa');
		}
	}

	update(path: string, id: string, updateItem: T) {
		try {
			const updated = this.getItemsByStorage().map((item: IListItem) => {
				if (item.id === id) {
					return updateItem;
				}
				return item;
			});
			this.setItemsByStorage(updated);
			return of<T[]>([]);
		} catch (e) {
			return this.returnThrowError('Erro ao atualizar a tarefa');
		}
	}

	deleteAll(path: string) {
		try {
			localStorage.removeItem('list');
			return of<T[]>([]);
		} catch (e) {
			return this.returnThrowError('Erro ao deletar as tarefas');
		}
	}

	deleteById(path: string, id: string) {
		try {
			const deleted = this.getItemsByStorage().filter((item: IListItem) => item.id !== id);
			this.setItemsByStorage(deleted);
			return of<T[]>([]);
		} catch (e) {
			return this.returnThrowError('Erro ao deletar a tarefa');
		}
	}

	returnCatchError(message: string): OperatorFunction<unknown, unknown> {
		return this.returnCatchError(message);
	}
	returnThrowError(message: string): Observable<never> {
		return this.returnThrowError(message);
	}
}
