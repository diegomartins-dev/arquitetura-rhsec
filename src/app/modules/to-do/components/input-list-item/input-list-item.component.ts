import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IListItem } from '../../interfaces/i-list-item.interface';

@Component({
	selector: 'app-input-list-item',
	standalone: true,
	imports: [],
	templateUrl: './input-list-item.component.html',
	styleUrl: './input-list-item.component.scss',
	animations: [
		trigger('fadeInOut', [
			transition(':enter', [
				style({ opacity: 0, transform: 'translateY(-20px)' }),
				animate('300ms linear', style({ opacity: 1, transform: 'translateY(0)' }))
			]),
			transition(':leave', [
				animate(
					'300ms ease-in',
					style({
						opacity: 0,
						transform: 'translateY(20px)'
					})
				)
			])
		])
	]
})
export class InputListItemComponent {
	@Input({ required: true }) inputListItems: IListItem[] = [];
	@Output() outputUpdateItemCheckbox = new EventEmitter<{
		id: string;
		value: string;
		checked: boolean;
	}>();

	@Output() outputUpdateItemValue = new EventEmitter<{
		id: string;
		value: string;
		checked: boolean;
	}>();

	@Output() outputUpdateItemDelete = new EventEmitter<{
		id: string;
	}>();

	updateItemCheckbox(id: string, value: string, checked: boolean) {
		this.outputUpdateItemCheckbox.emit({ id, value, checked });
	}

	updateItemValue(id: string, value: string, checked: boolean) {
		this.outputUpdateItemValue.emit({ id, value, checked });
	}

	deleteItemValue(id: string) {
		this.outputUpdateItemDelete.emit({ id });
	}
}
