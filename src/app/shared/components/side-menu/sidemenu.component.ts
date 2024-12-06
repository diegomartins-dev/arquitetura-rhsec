import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, ViewChild } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { Subcategory, SubmenuComponent } from './submenu/submenu.component';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';
import { ClickOutsideMenuDirective } from '../../directives/click-outside-menu.directive';

export interface Category {
	name: string;
	icon: string;
	color?: string;
	subcategories?: Subcategory[];
	route?: string;
}

@Component({
	selector: 'app-side-menu',
	templateUrl: 'sidemenu.component.html',
	styleUrl: 'sidemenu.component.scss',
	standalone: true,
	imports: [
		PanelMenuModule,
		NgStyle,
		NgClass,
		ClickOutsideMenuDirective,
		SubmenuComponent,
		SidebarModule,
		ButtonModule,
		ToolbarModule,
		InputTextModule,
		RippleModule,
		AvatarModule,
		StyleClassModule
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SideMenuComponent {
	menu: Category[] = [
		{
			name: 'Notificação',
			icon: 'pi pi-bell',
			color: '#0050A9'
		},
		{
			name: 'Mais',
			icon: 'pi pi-ellipsis-h',
			color: '#0050A9'
		},
		{
			name: 'Pasta',
			icon: 'pi pi-folder',
			color: '#0050A9',
			subcategories: [
				{
					name: 'Home',
					route: 'home'
				},
				{
					name: 'Programação Escolar',
					route: 'programacao-escolar'
				},
				{
					name: 'Práticas de Ensino',
					route: 'praticas-ensino'
				},
				{
					name: 'Regência',
					items: [
						{
							name: 'Grade Escolar',
							route: 'regencia/grade'
						},
						{
							name: 'Licença',
							route: 'regencia/licenca'
						}
					]
				},
				{
					name: 'Administração',
					route: 'admin'
				},
				{
					name: 'Escola',
					route: 'escola'
				}
			]
		}
	];

	isMobile = false;
	menuOpened = false;

	closeMenu(event: any): void {
		if (event) this.initializeMenu();
	}

	initializeMenu(): void {
		this.openCategory = null;
		this.categoryOpenned = null;
	}

	openCategory: string | null = null;
	submenuPosition = { x: 0, y: 0 };
	categoryOpenned: string | null = null;
	openSubmenu(event: MouseEvent, category: string, subcategories?: Subcategory[]) {
		if (!subcategories) {
			this.categoryOpenned = null;
			this.openCategory = null;
			return;
		}
		this.openCategory = category;
		if (this.categoryOpenned != category) {
			this.categoryOpenned = category;
		} else if (this.categoryOpenned == category) {
			this.categoryOpenned = null;
			this.openCategory = null;
		}
		this.submenuPosition.x = 90;
		this.submenuPosition.y = (event.target as HTMLElement).getBoundingClientRect().top;
	}

	@HostListener('window:resize', ['$event'])
	@HostListener('window:load', ['$event'])
	onResize(event: Event) {
		this.isMobile = window.innerWidth <= 768;
		this.initializeMenu();
	}

	openCloseMenu() {
		!this.isMobile ? (this.menuOpened = true) : (this.menuOpened = false);
	}

	@ViewChild('sidebarRef') sidebarRef!: Sidebar;

	closeCallback(e: any): void {
		this.sidebarRef.close(e);
	}

	sidebarVisible: boolean = false;
}
