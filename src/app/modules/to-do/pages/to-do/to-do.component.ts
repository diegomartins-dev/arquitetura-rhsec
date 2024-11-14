import { Component, inject, OnInit, signal } from '@angular/core';

import { MenuDefinitivoComponent } from '../../../../shared/components/menu-definitivo/menu-definitivo.component';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { InputListItemComponent } from '../../components/input-list-item/input-list-item.component';
import { IListItem } from '../../interfaces/i-list-item.interface';
import { ToDoController } from '../../controllers/to-do.controller';

@Component({
	selector: 'app-to-do',
	standalone: true,
	imports: [InputAddItemComponent, InputListItemComponent, MenuDefinitivoComponent],
	providers: [ToDoController],
	templateUrl: './to-do.component.html',
	styleUrl: './to-do.component.scss'
})
export class ToDoComponent implements OnInit {
	isAddItem = signal<boolean>(true);
	toDoController = inject(ToDoController);

	ngOnInit(): void {
		this.getAllItems();
	}

	getAllItems() {
		return this.toDoController.listen();
	}

	addItem(newItem: IListItem) {
		if (newItem) {
			this.toDoController.addTodo(newItem);
		}
	}

	removeAllItems() {
		this.toDoController.removeAllTodos();
	}

	getItemsByStage(stage: 'pending' | 'completed') {
		return stage == 'pending' ? this.toDoController.uncompletedTodos : this.toDoController.completedTodos;
	}

	updateItem(updateItem: IListItem) {
		this.toDoController.updateTodo(updateItem);
	}

	updateStageItem(updateItem: IListItem) {
		this.toDoController.updateStageTodo(updateItem.id, updateItem.checked ? 'completed' : 'pending');
	}

	deleteItem(id: string) {
		this.toDoController.removeTodo(id);
	}
}
