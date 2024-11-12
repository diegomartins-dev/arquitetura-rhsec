import { animate, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MenuVerticalComponent } from './menu-vertical/menu-vertical.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';

export interface Category {
	name: string;
	subcategories?: Category[];
	expanded?: boolean;
}

@Component({
	selector: 'app-menu-lateral',
	templateUrl: 'menu-lateral.component.html',
	styleUrl: 'menu-lateral.component.scss',
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
		MenuVerticalComponent,
		CdkAccordionModule
	],
	animations: [
		trigger('columnAnimation', [
			transition('void => lateral', [
				style({ opacity: 0, transform: 'translateX(-20px)' }),
				animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
			]),
			transition('lateral => void', [animate('300ms ease-in', style({ opacity: 0, transform: 'translateX(-20px)' }))]),
			transition('void => collapse', [
				style({ opacity: 0, transform: 'translateY(-20px)' }),
				animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
			]),
			transition('collapse => void', [
				style({ opacity: 1, transform: 'translateY(0)' }),
				animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
			])
		])
	]
})
export class MenuLateralComponent implements OnInit {
	menuDB: Category[] = [
		{
			name: 'Categoria 1',
			subcategories: [
				{ name: 'Subcategoria 1.1', subcategories: [{ name: 'Item 1.1.1' }] },
				{ name: 'Subcategoria 1.2' }
			]
		},
		{
			name: 'Categoria 2',
			subcategories: [
				{
					name: 'Subcategoria 2.1 com nome grande para ve como fica',
					subcategories: [{ name: 'Item 2.2.1', subcategories: [{ name: 'Item 2.2.1.1' }] }]
				},
				{
					name: 'Subcategoria 2.2',
					subcategories: [
						{ name: 'Item 2.2.1 com nome grande para ve como fica', subcategories: [{ name: 'Item 2.2.1.1' }] }
					]
				}
			]
		},
		{
			name: 'Categoria 3 com nome grande para ve como fica'
		}
	];

	menuLevels: Category[][] = [this.menuDB];

	constructor(private breakpointObserver: BreakpointObserver) {}
	ngOnInit(): void {
		this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
			this.isMobile = result.matches;
		});
	}

	menuOpened = true;

	isMobile = false;
	@HostListener('window:resize', ['$event'])
	@HostListener('window:load', ['$event'])
	onResize(event: Event) {
		this.isMobile = window.innerWidth <= 768;
		this.initizalideMenu();
	}

	closeMenu(): void {}

	initizalideMenu() {
		this.menuLevels = [this.menuDB];
		// this.menuOpened = false;
		this.resetMenuLevels(this.menuLevels[0]);
	}

	resetMenuLevels(menuLevels: Category[]): void {
		for (let menuItem of menuLevels) {
			if (menuItem.subcategories) {
				menuItem.expanded = false;
				this.resetMenuLevels(menuItem.subcategories);
			} else {
				menuItem.expanded = false;
			}
		}
	}

	toggleSubcategory(category: Category, levelIndex: number): void {
		if (this.isMobile) {
			let expanded = category.expanded;
			this.resetMenuLevels(this.menuLevels[0]);
			category.expanded = !expanded;
		} else {
			if (category == null) this.menuLevels = [this.menuDB];
			if (category && levelIndex) {
				if (this.menuLevels[levelIndex] === category.subcategories) {
					this.menuLevels = this.menuLevels.slice(0, levelIndex);
					if (!category.subcategories) {
						this.menuLevels = [this.menuDB];
					}
				} else if (category.subcategories) {
					this.menuLevels = this.menuLevels.slice(0, levelIndex);
					if (category.subcategories) {
						this.menuLevels[levelIndex] = category.subcategories;
					}
				} else {
					this.menuLevels = [this.menuDB];
				}
			}
		}
	}

	items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
	expandedIndex = 0;
}
