import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrl: './card.component.scss',
	standalone: true,
	imports: [CardModule, NgClass]
})
export class CardComponent {
	@Input({ required: true }) titleIconBgColor!: 'warning' | 'danger' | 'info' | 'success';
	@Input({ required: true }) titleName!: string;
	@Input({ required: true }) titleNumber!: number;
	@Input({ required: true }) statistics!: { number: number; text: string };
	@Input({ required: true }) titleIconImage!: { src: string; alt: string };
}
