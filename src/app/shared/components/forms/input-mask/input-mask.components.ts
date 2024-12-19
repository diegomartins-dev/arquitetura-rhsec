import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-mask',
  standalone: true,
  templateUrl: './input-mask.component.html',
  styleUrls: ['./input-mask.component.scss'],
  imports: [CommonModule, FormsModule, InputMaskModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputMaskComponent),
      multi: true
    }
  ]
})
export class InputMaskComponent implements ControlValueAccessor {
  @Input() mask: string = '';
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() errorMessage: string = '';
  @Input() invalid: boolean = false;
  @Input() cyErrorId: string = '';
  @Input() cyInputId: string = '';

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
}
