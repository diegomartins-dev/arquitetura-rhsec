import { inject, Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';

import { IListItem } from '../interfaces/i-list-item.interface';
import { ApiService } from '../../../../core/repository/api.service';

export interface IReturn {
	status: 'success' | 'error';
	message?: string;
	data?: IListItem[];
}

@Injectable({
	providedIn: 'root'
})
export class ToDoService {
	private path = 'todos';
	private apiService = inject<ApiService<IListItem>>(ApiService);

	constructor() {}

	getAll(): Observable<IReturn> {
		try {
			return this.apiService
				.getAll(this.path)
				.pipe(map((res) => ({ status: 'success', data: res })))
				.pipe(this.apiService.returnCatchError('Erro ao carregar as tarefas')) as Observable<IReturn>;
		} catch (e) {
			return from<IReturn[]>([{ status: 'error', message: 'Erro ao carregar as tarefas' }]);
		}
	}

	getById(id: string): Observable<IReturn> {
		try {
			return this.apiService
				.getById(this.path, id)
				.pipe(map((res) => ({ status: 'success', data: res })))
				.pipe(this.apiService.returnCatchError('Erro ao carregar a tarefa')) as Observable<IReturn>;
		} catch (e) {
			return from<IReturn[]>([{ status: 'error', message: 'Erro ao carregar a tarefa' }]);
		}
	}

	getByStage(stage: 'pending' | 'completed'): Observable<IReturn> {
		try {
			return this.apiService
				.list(this.path, { attr: 'checked', value: stage === 'pending' ? 'false' : 'true' })
				.pipe(map((res) => ({ status: 'success', data: res })))
				.pipe(this.apiService.returnCatchError('Erro ao carregar as tarefas')) as Observable<IReturn>;
		} catch (e) {
			return from<IReturn[]>([{ status: 'error', message: 'Erro ao carregar as tarefas' }]);
		}
	}

	save(newTodo: IListItem) {
		try {
			return this.apiService
				.create(this.path, newTodo)
				.pipe(map(() => ({ status: 'success', message: 'Tarefa criada com sucesso' })))
				.pipe(this.apiService.returnCatchError('Erro ao salvar a tarefa')) as Observable<IReturn>;
		} catch (e) {
			return from<IReturn[]>([{ status: 'error', message: 'Erro ao salvar a tarefa' }]);
		}
	}

	updateStage(id: string, stage: 'pending' | 'completed') {
		try {
			return this.apiService
				.updateByPatch(this.path, id, { attr: 'checked', value: stage === 'completed' })
				.pipe(map(() => ({ status: 'success', message: 'Tarefa atualizada com sucesso' })))
				.pipe(this.apiService.returnCatchError('Erro ao atualizar a tarefa')) as Observable<IReturn>;
		} catch (e) {
			return from<IReturn[]>([{ status: 'error', message: 'Erro ao atualizar a tarefa' }]);
		}
	}

	update(updateTodo: IListItem) {
		try {
			return this.apiService
				.update(this.path, updateTodo.id, updateTodo)
				.pipe(map(() => ({ status: 'success', message: 'Tarefa atualizada com sucesso' })))
				.pipe(this.apiService.returnCatchError('Erro ao atualizar a tarefa')) as Observable<IReturn>;
		} catch (e) {
			return from<IReturn[]>([{ status: 'error', message: 'Erro ao atualizar a tarefa' }]);
		}
	}

	deleteAll() {
		try {
			return this.apiService
				.deleteAll(this.path)
				.pipe(map(() => ({ status: 'success', message: 'Tarefas deletadas com sucesso' })))
				.pipe(this.apiService.returnCatchError('Erro ao deletar as tarefas')) as Observable<IReturn>;
		} catch (e) {
			return from<IReturn[]>([{ status: 'error', message: 'Erro ao deletar as tarefas' }]);
		}
	}

	deleteById(id: string) {
		try {
			return this.apiService
				.deleteById(this.path, id)
				.pipe(map(() => ({ status: 'success', message: 'Tarefa deletada com sucesso' })))
				.pipe(this.apiService.returnCatchError('Erro ao deletar a tarefa')) as Observable<IReturn>;
		} catch (e) {
			return from<IReturn[]>([{ status: 'error', message: 'Erro ao deletar a tarefa' }]);
		}
	}
}
