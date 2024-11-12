import { Injectable, signal } from '@angular/core';
import { IListItem } from '../interfaces/i-list-item.interface';

@Injectable({
	providedIn: 'root'
})
export class ToDoService {
	#setListItems = signal<IListItem[]>(this.#getItemsByStorage());
	#getListItems = this.#setListItems.asReadonly();

	constructor() {}

	#getItemsByStorage() {
		return JSON.parse(localStorage.getItem('list') || '[]');
	}

	#setItemsByStorage(items: IListItem[]) {
		localStorage.setItem('list', JSON.stringify(items));
	}

	#setItem(newItem: IListItem) {
		localStorage.setItem('list', JSON.stringify([...this.#getListItems(), newItem]));
		this.#setListItems.set(this.#getItemsByStorage());
	}

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
		this.#setItem(newItem);
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
		this.#setItemsByStorage(this.#getListItems());
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
		this.#setItemsByStorage(this.#getListItems());
	}

	deleteAll() {
		localStorage.removeItem('list');
		this.#setListItems.set(this.#getItemsByStorage());
	}

	deleteById(id: string) {
		this.#setListItems.update((oldValues) => {
			return oldValues.filter((item) => item.id !== id);
		});
		this.#setItemsByStorage(this.#getListItems());
	}
}
