import { Injectable } from '@angular/core';
import { IListItem } from '../interfaces/i-list-item.interface';
import { ToDoService } from '../services/to-do.service';
import { ToDoState } from '../state/to-do.state';
import { NotificationService } from '../../../shared/components/notification/notification.service';

@Injectable()
export class ToDoController {
	todos: IListItem[] = [];
	completedTodos: IListItem[] = [];
	uncompletedTodos: IListItem[] = [];

	constructor(
		private toDoService: ToDoService,
		private state: ToDoState,
		private notificationService: NotificationService
	) {}

	initialize() {
		this.completedTodos = this.state.getByStage('completed');
		this.uncompletedTodos = this.state.getByStage('pending');
		this.todos = this.state.getAll();
	}

	listen(): void {
		this.toDoService.getAll().subscribe((result) => {
			this.state.set(result.data || []);
			this.initialize();
		});
	}

	addTodo(newItem: IListItem): void {
		this.toDoService.save(newItem).subscribe(
			(data) => {
				this.notificationService.success(data.message || 'Tarefa adicionada com sucesso');
				this.state.save(newItem);
				this.initialize();
			},
			(error) => {
				this.notificationService.error(error.message || 'Aconteceu algum erro');
			}
		);
	}

	updateTodo(updateItem: IListItem): void {
		this.toDoService.update(updateItem).subscribe(
			(data) => {
				this.notificationService.success(data.message || 'Tarefa atualizada com sucesso');
				this.state.update(updateItem);
				this.initialize();
			},
			(error) => {
				this.notificationService.error(error.message || 'Aconteceu algum erro');
			}
		);
	}

	updateStageTodo(id: string, stage: 'pending' | 'completed'): void {
		this.toDoService.updateStage(id, stage).subscribe(
			(data) => {
				this.state.updateStage(id, stage);
				this.initialize();
			},
			(error) => {
				this.notificationService.error(error.message || 'Aconteceu algum erro');
			}
		);
	}

	removeTodo(id: string): void {
		this.toDoService.deleteById(id).subscribe(
			(data) => {
				this.notificationService.success(data.message || 'Tarefa deletada com sucesso');
				this.state.deleteById(id);
				this.initialize();
			},
			(error) => {
				this.notificationService.error(error.message || 'Aconteceu algum erro');
			}
		);
	}

	removeAllTodos(): void {
		this.toDoService.deleteAll().subscribe(
			(data) => {
				this.notificationService.success(data.message || 'Tarefas deletadas com sucesso');
				this.state.deleteAll();
				this.initialize();
			},
			(error) => {
				this.notificationService.error(error.message || 'Aconteceu algum erro');
			}
		);
	}
}
