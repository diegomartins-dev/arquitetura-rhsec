import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, OnInit, ViewChild } from '@angular/core';
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
import { DashboardHeaderComponent } from '../dashboard/header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

export interface Category {
	id: string;
	label: string;
	icon: string;
	color?: string;
	items?: Subcategory[];
	route?: string;
	styleClass?: string;
	notExpandIcon: boolean;
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
		DashboardHeaderComponent,
		SidebarComponent
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SideMenuComponent implements OnInit {
	menu: Category[] = [
		{
			id: '1',
			label: 'Programação',
			icon: 'folder',
			color: '#0050A9',
			notExpandIcon: true,
			items: [
				{
					id: '1-1',
					label: 'Programação Escolar',
					route: 'home'
				},
				{
					id: '1-2',
					label: 'Práticas de Ensino',
					route: 'praticas-ensino'
				},
				{
					id: '1-3',
					label: 'Regência',
					items: [
						{
							id: '1-3-1',
							label: 'Grade Escolar',
							route: 'regencia/grade'
						},
						{
							id: '1-3-2',
							label: 'Licença',
							route: 'regencia/licenca'
						}
					]
				},
				{
					id: '1-4',
					label: 'Administração',
					items: [
						{
							id: '1-5-1',
							label: 'Admin 1',
							route: 'admin/item1'
						},
						{
							id: '1-5-2',
							label: 'Admin 2',
							route: 'admin/item2'
						}
					]
				},
				{
					id: '1-5',
					label: 'Escola',
					route: 'escola'
				}
			]
		},
		{
			id: '2',
			label: 'Pasta 2',
			icon: 'folder',
			color: '#0050A9',
			notExpandIcon: true,
			items: [
				{
					id: '2-1',
					label: 'item 1'
				},
				{
					id: '2-2',
					label: 'item 2'
				},
				{
					id: '2-3',
					label: 'item 3'
				},
				{
					id: '2-4',
					label: 'item 4'
				}
			]
		},
		{
			id: '3',
			label: 'Pasta 3',
			icon: 'folder',
			color: '#0050A9',
			notExpandIcon: true,
			items: [
				{
					id: '3-1',
					label: 'item 1'
				},
				{
					id: '3-2',
					label: 'item 2'
				},
				{
					id: '3-3',
					label: 'item 3'
				},
				{
					id: '3-4',
					label: 'item 4'
				}
			]
		},
		{
			id: '4',
			label: 'Pasta 4',
			icon: 'folder',
			color: '#0050A9',
			notExpandIcon: true,
			items: [
				{
					id: '4-1',
					label: 'item 1'
				},
				{
					id: '4-2',
					label: 'item 2'
				},
				{
					id: '4-3',
					label: 'item 3'
				},
				{
					id: '4-4',
					label: 'item 4'
				}
			]
		},
		{
			id: '5',
			label: 'Pasta 5',
			icon: 'folder',
			color: '#0050A9',
			notExpandIcon: true,
			items: [
				{
					id: '5-1',
					label: 'item 1'
				},
				{
					id: '5-2',
					label: 'item 2'
				},
				{
					id: '5-3',
					label: 'item 3'
				},
				{
					id: '5-4',
					label: 'item 4'
				}
			]
		},
		{
			id: '6',
			label: 'Pasta 6',
			icon: 'folder',
			color: '#0050A9',
			notExpandIcon: true,
			items: [
				{
					id: '6-1',
					label: 'item 1'
				},
				{
					id: '6-2',
					label: 'item 2'
				},
				{
					id: '6-3',
					label: 'item 3'
				},
				{
					id: '6-4',
					label: 'item 4'
				}
			]
		}
	];

	isMobile = false;

	openCategory: string | null = null;
	submenuPosition = { x: 0, y: 0 };
	categoryOpenned: string | null = null;
	closeSubmenu = false;

	sidebarVisible: boolean = false;

	ngOnInit(): void {
		this.onResize();
	}

	closeMenu(event: any): void {
		if (event) this.initializeMenu();
	}

	initializeMenu(): void {
		this.openCategory = null;
		this.categoryOpenned = null;
		this.sidebarVisible = false;
		this.closeSubmenu = true;
	}

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

	@HostListener('window:resize')
	onResize() {
		this.isMobile = window.innerWidth <= 768;
		this.initializeMenu();
	}
}
