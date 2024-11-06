import { ToDoService } from './../../services/to-do.service';
import { Component, signal, inject } from '@angular/core';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { IListItem } from '../../interfaces/i-list-item.interface';
import { InputListItemComponent } from '../../components/input-list-item/input-list-item.component';
import { MenuLateralComponent } from '../../components/menu-lateral/menu-lateral.component';

@Component({
	selector: 'app-list',
	standalone: true,
	imports: [InputAddItemComponent, InputListItemComponent, MenuLateralComponent],
	templateUrl: './list.component.html',
	styleUrl: './list.component.scss'
})
export class ListComponent {
	isAddItem = signal<boolean>(true);

	injectToDoService = inject(ToDoService);

	getAllItems() {
		return this.injectToDoService.getAll();
	}

	addItem(newItem: IListItem) {
		if (newItem) {
			this.injectToDoService.save(newItem);
		}
	}

	deleteAllItems() {
		this.injectToDoService.deleteAll();
	}

	getItemsByStage(stage: 'pending' | 'completed') {
		return this.injectToDoService.getByStage(stage);
	}

	updateItem(updateItem: IListItem) {
		this.injectToDoService.update({
			...updateItem
		});
	}

	deleteItem(id: string) {
		this.injectToDoService.deleteById(id);
	}
}
