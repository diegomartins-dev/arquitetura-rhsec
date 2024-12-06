import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PanelMenuModule } from 'primeng/panelmenu';

export interface Subcategory {
	name: string;
	items?: Subcategory[];
	route?: string;
}

@Component({
	selector: 'app-submenu',
	templateUrl: './submenu.component.html',
	styleUrl: './submenu.component.scss',
	standalone: true,
	imports: [RouterLink, RouterLinkActive, PanelMenuModule]
})
export class SubmenuComponent {
	@Input() submenu?: Subcategory[];
	@Output() outputClickSubmenu = new EventEmitter<boolean>();
	readonly panelOpenState = signal(false);
}
