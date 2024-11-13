import { animate, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatExpansionModule } from '@angular/material/expansion';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { NotificationComponent } from '../notification/notification.component';

export interface Category {
	name: string;
	subcategories?: Category[];
}

@Component({
	selector: 'app-menu-definitivo',
	templateUrl: 'menu-definitivo.component.html',
	styleUrl: 'menu-definitivo.component.scss',
	standalone: true,
	imports: [
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
		MatSidenavModule,
		MatListModule,
		NgFor,
		NgIf,
		NgClass,
		NgStyle,
		CdkAccordionModule,
		MatExpansionModule,
		MenuItemComponent,
		NotificationComponent
	]
})
export class MenuDefinitivoComponent {
	menu: Category[] = [
		{
			name: 'Categoria 1',
			subcategories: [
				{ name: 'Subcategoria 1.1', subcategories: [{ name: 'Item 1.1.1' }] },
				{ name: 'Subcategoria 1.2' }
			]
		},
		{
			name: 'Categoria 2 com nome grande para ve como fica',
			subcategories: [
				{
					name: 'Subcategoria 2.1 com nome grande para ve como fica',
					subcategories: [
						{
							name: 'Item 2.2.1',
							subcategories: [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' }, { name: 'Item 4' }]
						},
						{
							name: 'Item 2.2.2',
							subcategories: [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' }, { name: 'Item 4' }]
						},
						{
							name: 'Item 2.2.3',
							subcategories: [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' }, { name: 'Item 4' }]
						}
					]
				},
				{
					name: 'Subcategoria 2.2',
					subcategories: [
						{ name: 'Item 2.2.1 com nome grande para ve como fica', subcategories: [{ name: 'Item 2.2.1.1' }] }
					]
				},
				{
					name: 'Subcategoria 2.3'
				}
			]
		},
		{
			name: 'Categoria 3'
		}
	];

	isMobile = false;
	menuOpened = false;

	constructor(private breakpointObserver: BreakpointObserver) {}
	ngOnInit(): void {
		this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
			this.isMobile = result.matches;
			this.openCloseMenu();
		});
	}

	@HostListener('window:resize', ['$event'])
	@HostListener('window:load', ['$event'])
	onResize(event: Event) {
		this.isMobile = window.innerWidth <= 768;
		this.openCloseMenu();
		this.initializeMenu();
	}

	openCloseMenu() {
		!this.isMobile ? (this.menuOpened = true) : (this.menuOpened = false);
	}

	closeMenu(): void {}

	initializeMenu() {
		this.categoryOpenned = null;
		this.openCategory = null;
	}

	openCategory: string | null = null;
	submenuPosition = { x: 0, y: 0 };
	categoryOpenned: string | null = null;
	openSubmenu(event: MouseEvent, category: string) {
		this.openCategory = category;
		if (this.categoryOpenned != category) {
			this.categoryOpenned = category;
		} else if (this.categoryOpenned == category) {
			this.categoryOpenned = null;
			this.openCategory = null;
		}
		this.submenuPosition.x = (event.target as HTMLElement).getBoundingClientRect().right;
		this.submenuPosition.y = (event.target as HTMLElement).getBoundingClientRect().top;
	}

	readonly panelOpenState = signal(false);
	closeSubmenu() {
		this.openCategory = null;
	}
}
