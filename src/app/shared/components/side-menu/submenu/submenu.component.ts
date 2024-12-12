import {
	AfterViewInit,
	Component,
	EventEmitter,
	inject,
	Input,
	OnInit,
	Output,
	Renderer2,
	ViewChild
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';

export interface Subcategory {
	id: string;
	label: string;
	expanded?: boolean;
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
export class SubmenuComponent implements AfterViewInit, OnInit {
	@Input() submenu?: Subcategory[];
	@Output() outputClickSubmenu = new EventEmitter<boolean>();
	panelOpenState = false;

	@ViewChild('panelMenu') panelMenu: any;

	private renderer = inject(Renderer2);

	ngOnInit(): void {
		this.submenu?.map((menuItem) => {
			menuItem.expanded = false;
		});
	}

	ngAfterViewInit() {
		const expandedDivs = document.querySelectorAll('.p-toggleable-content');
		expandedDivs.forEach((div: any) => {
			this.renderer.setAttribute(div, 'data-test', 'submenu-panel-content-' + div.id);
		});
	}

	searchClassnameInParent(element: HTMLElement, className: string): boolean {
		if (element.parentElement && !element.classList.contains(className)) {
			return this.searchClassnameInParent(element.parentElement, className);
		} else {
			return element.classList.contains(className) ? true : false;
		}
	}

	clickSubmenu(event: Event) {
		event.stopPropagation();
		this.outputClickSubmenu.emit(true);
	}

	//Apenas para quando clicar em cima do icon do submenu, não se propagar o efeito e fechar o menu com this.outputClickSubmenu
	stopClickPropagation(event: Event) {
		event.stopPropagation();
	}
}
