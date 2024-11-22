import { Injectable, signal } from '@angular/core';
import { IListItem } from '../interfaces/i-list-item.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ToDoState {
	#setListItems = signal<IListItem[]>([]);
	#getListItems = this.#setListItems.asReadonly();

	constructor() {}

	getAll() {
		return this.#getListItems();
	}

	getById(id: string) {
		return this.#getListItems().find((item) => item.id === id);
	}

	getByStage(stage: 'pending' | 'completed') {
		return this.#getListItems().filter((item) =>
			stage === 'pending' ? !item.checked : stage === 'completed' ? item.checked : item
		);
	}

	save(newItem: IListItem) {
		this.#setListItems.set([...this.#getListItems(), newItem]);
	}

	set(items: IListItem[]) {
		this.#setListItems.set(items);
	}

	updateStage(id: string, stage: 'pending' | 'completed') {
		this.#setListItems.update((oldValues) => {
			return oldValues.map((item) => {
				if (item.id === id) {
					return { ...item, checked: stage === 'completed' };
				}
				return item;
			});
		});
	}

	update(updateItem: IListItem) {
		this.#setListItems.update((oldValues) => {
			return oldValues.map((item) => {
				if (item.id === updateItem.id) {
					return updateItem;
				}
				return item;
			});
		});
	}

	deleteAll() {
		this.#setListItems.set([]);
	}

	deleteById(id: string) {
		this.#setListItems.update((oldValues) => {
			return oldValues.filter((item) => item.id !== id);
		});
	}
}
