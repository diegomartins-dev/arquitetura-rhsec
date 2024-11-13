import { Inject, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ToDoService } from './services/to-do.service';
import { ToDoState } from './state/to-do.state';
import { IListItem } from './interfaces/i-list-item.interface';
import { NotificationService } from '../../shared/components/notification/notification.service';

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
		// const newItem = { value: title, checked: false, id: this.state.generateId() };
		this.toDoService.save(newItem).subscribe(
			(data) => {
				this.notificationService.success(data.message || 'Tarefa adicionada com sucesso');
				this.state.save(newItem);
				this.initialize();
			},
			(error) => {
				alert(error.message);
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
				alert(error.message);
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
				alert(error.message);
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
				alert(error.message);
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
				alert(error.message);
			}
		);
	}
}
