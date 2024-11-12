import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Category } from '../menu-lateral.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'app-menu-vertical',
	templateUrl: 'menu-vertical.component.html',
	styleUrl: 'menu-vertical.component.scss',
	standalone: true,
	imports: [MatIconModule, MatSidenavModule, MatListModule, NgFor, NgIf, NgStyle],
	animations: [
		trigger('expand', [
			transition(':enter', [
				style({ opacity: 0, transform: 'translateY(-20px)' }),
				animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
			]),
			transition(':leave', [
				style({ opacity: 1, transform: 'translateY(0)' }),
				animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
			])
		])
	]
})
export class MenuVerticalComponent implements OnChanges {
	@Input() item?: Category[] | undefined;
	@Input() levelIndex!: number;
	@Input() isMobile: boolean = false;
	@Input() closeMenu: boolean = false;

	toggleSubcategory(index: number): void {
		if (this.item && this.item[index]) {
			let expanded = this.item[index].expanded;
			this.resetLevels(this.item);
			this.item[index].expanded = !expanded;
		}
	}

	resetLevels(levels: Category[]): void {
		for (let category of levels) {
			if (category.subcategories) {
				category.expanded = false;
				this.resetLevels(category.subcategories);
			} else {
				category.expanded = false;
			}
		}
	}

	ngOnChanges(changes: any): void {
		if (changes?.closeMenu?.currentValue) {
			this.item?.map((item) => (item.expanded = false));
		}
	}

	calcPadding(levelIndex: number): string {
		return `calc(12px * ${levelIndex})`;
	}
}
