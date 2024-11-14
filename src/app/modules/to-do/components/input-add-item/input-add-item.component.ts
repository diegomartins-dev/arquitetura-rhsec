import { NgClass } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { IListItem } from '../../interfaces/i-list-item.interface';

@Component({
	selector: 'app-input-add-item',
	standalone: true,
	imports: [NgClass],
	templateUrl: './input-add-item.component.html',
	styleUrl: './input-add-item.component.scss'
})
export class InputAddItemComponent {
	@ViewChild('inputValue') inputValue!: ElementRef;

	@Input({ required: true }) inputListItems: IListItem[] = [];
	@Output() outputAddListItem = new EventEmitter<IListItem>();

	focustAndAddItem(value: string) {
		if (value) {
			this.inputValue.nativeElement.value = '';

			const id = this.generateId();
			this.outputAddListItem.emit({
				checked: false,
				value,
				id
			});

			return this.inputValue.nativeElement.focus();
		}
	}

	generateId() {
		return Math.random().toString(36).slice(2);
	}
}
