import {
	Component,
	EventEmitter,
	inject,
	Input,
	Output,
	Renderer2,
	signal,
	ViewChild,
	AfterViewInit
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule, PanelMenuSub } from 'primeng/panelmenu';

export interface Subcategory {
	id: string;
	label: string;
	icon?: string;
	items?: Subcategory[];
	route?: string;
	styleClass?: string;
}

@Component({
	selector: 'app-submenu',
	templateUrl: './submenu.component.html',
	styleUrl: './submenu.component.scss',
	standalone: true,
	imports: [RouterLink, RouterLinkActive, PanelMenuModule, PanelModule]
})
export class SubmenuComponent implements AfterViewInit {
	@Input() submenu?: Subcategory[];
	@Output() outputClickSubmenu = new EventEmitter<boolean>();
	readonly panelOpenState = signal(false);

	@ViewChild('panelMenu') panelMenu: any;

	private renderer = inject(Renderer2);

	ngAfterViewInit() {
		const expandedDivs = document.querySelectorAll('.p-toggleable-content');
		expandedDivs.forEach((div: any) => {
			this.renderer.setAttribute(div, 'data-test', 'submenu-panel-content-' + div.id);
		});
	}
}
