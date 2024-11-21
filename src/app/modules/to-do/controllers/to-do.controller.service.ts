import { Injectable, effect, inject } from '@angular/core';
import { IListItem } from '../interfaces/i-list-item.interface';
import { ToDoService } from '../services/to-do.service';
import { ToDoState } from '../state/to-do.state';
import { NotificationService } from '../../../shared/components/notification/notification.service';
import { AuthControllerService } from '../../auth/controllers/auth.controller.service';

@Injectable()
export class ToDoControllerService {
	todos: IListItem[] = [];
	completedTodos: IListItem[] = [];
	uncompletedTodos: IListItem[] = [];

	private toDoService = inject(ToDoService);
	private state = inject(ToDoState);
	private notificationService = inject(NotificationService);
	private authControllerService = inject(AuthControllerService);

	constructor() {
		effect(() => {
			this.initialize();
		});
	}

	initialize() {
		this.completedTodos = this.state.getByStage('completed');
		this.uncompletedTodos = this.state.getByStage('pending');
		this.todos = this.state.getAll();
	}

	listen(): void {
		this.toDoService.getAll().subscribe((result) => {
			this.state.set(result.data || []);
		});
	}

	addTodo(newItem: IListItem): void {
		if (!this.isAuthorized('admin')) {
			this.notificationService.error('Você não tem permissão para adicionar tarefas');
			return;
		}
		this.toDoService.save(newItem).subscribe(
			(data) => {
				this.notificationService.success(data.message || 'Tarefa adicionada com sucesso');
				this.state.save(newItem);
			},
			(error) => {
				this.notificationService.error(error.message || 'Aconteceu algum erro');
			}
		);
	}

	updateTodo(updateItem: IListItem): void {
		if (!this.isAuthorized('admin')) {
			this.notificationService.error('Você não tem permissão para atualizar tarefas');
			return;
		}
		this.toDoService.update(updateItem).subscribe(
			(data) => {
				this.notificationService.success(data.message || 'Tarefa atualizada com sucesso');
				this.state.update(updateItem);
			},
			(error) => {
				this.notificationService.error(error.message || 'Aconteceu algum erro');
			}
		);
	}

	updateStageTodo(id: string, stage: 'pending' | 'completed'): void {
		this.toDoService.updateStage(id, stage).subscribe(
			() => {
				this.state.updateStage(id, stage);
			},
			(error) => {
				this.notificationService.error(error.message || 'Aconteceu algum erro');
			}
		);
	}

	removeTodo(id: string): void {
		if (!this.isAuthorized('admin')) {
			this.notificationService.error('Você não tem permissão para deletar tarefas');
			return;
		}
		this.toDoService.deleteById(id).subscribe(
			(data) => {
				this.notificationService.success(data.message || 'Tarefa deletada com sucesso');
				this.state.deleteById(id);
			},
			(error) => {
				this.notificationService.error(error.message || 'Aconteceu algum erro');
			}
		);
	}

	removeAllTodos(): void {
		if (!this.isAuthorized('admin')) {
			this.notificationService.error('Você não tem permissão para deletar tarefas');
			return;
		}
		this.toDoService.deleteAll().subscribe(
			(data) => {
				this.notificationService.success(data.message || 'Tarefas deletadas com sucesso');
				this.state.deleteAll();
			},
			(error) => {
				this.notificationService.error(error.message || 'Aconteceu algum erro');
			}
		);
	}

	isAuthorized(role: string): boolean {
		return this.authControllerService.isAuthorized(role);
	}
}
