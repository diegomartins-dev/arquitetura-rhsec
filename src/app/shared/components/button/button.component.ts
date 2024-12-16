import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'app-button',
	standalone: true,
	imports: [CommonModule, ButtonModule],
	template: `
		<button
			pButton
			[label]="label"
			[class]="styleClass"
			[disabled]="disabled"
			[type]="type"
			[attr.data-cy]="cyButtonId"
		></button>
	`,
	styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
	@Input() label: string = 'Button'; // Texto do botão
	@Input() styleClass: string = 'p-button-primary'; // Classe de estilo
	@Input() disabled: boolean = false; // Define se o botão está desabilitado
	@Input() type: string = 'button'; // Tipo do botão (button, submit, reset)
	@Input() cyButtonId: string = ''; // Tag para o cypress
}
