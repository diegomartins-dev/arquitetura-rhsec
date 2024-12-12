import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrl: './card.component.scss',
	standalone: true,
	imports: [CardModule]
})
export class CardComponent {}
