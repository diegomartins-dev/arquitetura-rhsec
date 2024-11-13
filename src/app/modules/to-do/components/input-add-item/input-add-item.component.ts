import { NgClass } from '@angular/common';
import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	inject,
	Input,
	Output,
	ViewChild
} from '@angular/core';

import { IListItem } from '../../interfaces/i-list-item.interface';

@Component({
	selector: 'app-input-add-item',
	standalone: true,
	imports: [NgClass],
	templateUrl: './input-add-item.component.html',
	styleUrl: './input-add-item.component.scss'
})
export class InputAddItemComponent {
	// #cdr = inject(ChangeDetectorRef);

	@ViewChild('inputValue') inputValue!: ElementRef;

	@Input({ required: true }) inputListItems: IListItem[] = [];
	@Output() outputAddListItem = new EventEmitter<IListItem>();

	focustAndAddItem(value: string) {
		if (value) {
			// this.#cdr.detectChanges();
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
