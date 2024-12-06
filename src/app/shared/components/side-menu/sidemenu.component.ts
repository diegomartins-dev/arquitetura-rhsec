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
	label: string;
	icon: string;
	color?: string;
	items?: Subcategory[];
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
		DashboardHeaderComponent,
		SidebarComponent
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SideMenuComponent implements OnInit {
	menu: Category[] = [
		{
			label: 'Notificação',
			icon: 'pi pi-bell',
			color: '#0050A9'
		},
		{
			label: 'Mais',
			icon: 'pi pi-ellipsis-h',
			color: '#0050A9'
		},
		{
			label: 'Pasta',
			icon: 'pi pi-folder',
			color: '#0050A9',
			items: [
				{
					label: 'Home',
					route: 'home'
				},
				{
					label: 'Programação Escolar',
					route: 'programacao-escolar'
				},
				{
					label: 'Práticas de Ensino',
					route: 'praticas-ensino'
				},
				{
					label: 'Regência',
					items: [
						{
							label: 'Grade Escolar',
							route: 'regencia/grade'
						},
						{
							label: 'Licença',
							route: 'regencia/licenca'
						}
					]
				},
				{
					label: 'Administração',
					route: 'admin'
				},
				{
					label: 'Escola',
					route: 'escola'
				}
			]
		}
	];

	isMobile = false;

	openCategory: string | null = null;
	submenuPosition = { x: 0, y: 0 };
	categoryOpenned: string | null = null;

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
