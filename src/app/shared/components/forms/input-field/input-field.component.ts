import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-input-field',
	standalone: true,
	templateUrl: './input-field.component.html',
	styleUrls: ['./input-field.component.scss'],
	imports: [CommonModule, InputTextModule],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputFieldComponent),
			multi: true
		}
	]
})
export class InputFieldComponent implements ControlValueAccessor {
	@Input() label: string = '';
	@Input() type: string = 'text';
	@Input() errorMessage: string = '';
	@Input() invalid: boolean = false;
	@Input() cyErrorId: string = '';
	@Input() cyInputId: string = '';
	@Output() outputOnBlur = new EventEmitter<boolean>();

	value: string = '';

	// Funções fornecidas pelo Angular
	onChange = (value: string) => {};
	onTouched = () => {};

	// Métodos da interface ControlValueAccessor
	writeValue(value: string): void {
		this.value = value || '';
	}

	registerOnChange(fn: (value: string) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	// Tratamento para evento de input
	handleInput(event: Event) {
		const value = (event.target as HTMLInputElement).value;
		this.value = value;
		this.onChange(value);
	}

	handleBlur() {
		this.outputOnBlur.emit(true);
	}
}
