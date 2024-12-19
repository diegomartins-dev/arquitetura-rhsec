import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	standalone: true,
	imports: [ButtonModule, RippleModule, StyleClassModule]
})
export class MenuComponent {
	closeCallback(event: Event) {
		event.stopPropagation();
	}
}
