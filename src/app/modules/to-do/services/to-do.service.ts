import { Injectable, signal } from '@angular/core';
import { IListItem } from '../interfaces/i-list-item.interface';
import { catchError, from, Observable } from 'rxjs';

export interface IReturn {
	status: 'success' | 'error';
	message?: string;
	data?: IListItem[];
}

@Injectable({
	providedIn: 'root'
})
export class ToDoService {
	constructor() {}

	getItemsByStorage() {
		return JSON.parse(localStorage.getItem('list') || '[]');
	}

	setItemsByStorage(items: IListItem[], message?: { success: string; error: string }) {
		localStorage.setItem('list', JSON.stringify(items));
	}

	getAll(): Observable<IReturn> {
		try {
			const items = this.getItemsByStorage();
			return from<IReturn[]>([{ status: 'success', data: items }]);
		} catch (e) {
			return from<IReturn[]>([{ status: 'error', message: 'Erro ao carregar as tarefas' }]);
		}
	}

	getById(id: string): Observable<IReturn> {
		try {
			const item = this.getItemsByStorage().find((item: IListItem) => item.id === id);
			return from<IReturn[]>([{ status: 'success', data: item }]);
		} catch (e) {
			return from<IReturn[]>([{ status: 'error', message: 'Erro ao carregar as tarefas' }]);
		}
	}

	getByStage(stage: 'pending' | 'completed'): Observable<IReturn> {
		try {
			const item = this.getItemsByStorage().filter((item: IListItem) =>
				stage === 'pending' ? !item.checked : stage === 'completed' ? item.checked : item
			);
			return from<IReturn[]>([{ status: 'success', data: item }]);
		} catch (e) {
			return from<IReturn[]>([{ status: 'error', message: 'Erro ao carregar as tarefas' }]);
		}
	}

	save(newItem: IListItem) {
		try {
			const updated = [...this.getItemsByStorage(), newItem];
			this.setItemsByStorage(updated);
			return from<IReturn[]>([{ status: 'success', message: 'Tarefa criada com sucesso' }]);
		} catch (e) {
			return from<IReturn[]>([{ status: 'error', message: 'Erro ao salvar as tarefas' }]);
		}
	}

	updateStage(id: string, stage: 'pending' | 'completed') {
		try {
			const updated = this.getItemsByStorage().map((item: IListItem) => {
				if (item.id === id) {
					return { ...item, checked: stage === 'completed' };
				}
				return item;
			});
			this.setItemsByStorage(updated);
			return from<IReturn[]>([{ status: 'success', message: 'Tarefa atualizada com sucesso' }]);
		} catch (e) {
			return from<IReturn[]>([{ status: 'error', message: 'Erro ao atualizar a tarefa' }]);
		}
	}

	update(updateItem: IListItem) {
		try {
			const updated = this.getItemsByStorage().map((item: IListItem) => {
				if (item.id === updateItem.id) {
					return updateItem;
				}
				return item;
			});
			this.setItemsByStorage(updated);
			return from<IReturn[]>([{ status: 'success', message: 'Tarefa atualizada com sucesso' }]);
		} catch (e) {
			return from<IReturn[]>([{ status: 'error', message: 'Erro ao atualizar a tarefa' }]);
		}
	}

	deleteAll() {
		try {
			localStorage.removeItem('list');
			return from<IReturn[]>([{ status: 'success', message: 'Tarefas deletada com sucesso' }]);
		} catch (e) {
			return from<IReturn[]>([{ status: 'error', message: 'Erro ao deletar as tarefas' }]);
		}
	}

	deleteById(id: string) {
		try {
			const deleted = this.getItemsByStorage().filter((item: IListItem) => item.id !== id);
			this.setItemsByStorage(deleted);
			return from<IReturn[]>([{ status: 'success', message: 'Tarefa deletada com sucesso' }]);
		} catch (e) {
			return from<IReturn[]>([{ status: 'error', message: 'Erro ao deletar a tarefa' }]);
		}
	}
}
