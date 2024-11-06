import { MediaMatcher } from '@angular/cdk/layout';
import {
	AfterContentChecked,
	ChangeDetectorRef,
	Component,
	HostListener,
	OnDestroy,
	OnInit,
	inject
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgFor, NgIf } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

interface Category {
	name: string;
	subcategories?: Category[];
	expanded?: boolean;
}

@Component({
	selector: 'app-menu-lateral',
	templateUrl: 'menu-lateral.component.html',
	styleUrl: 'menu-lateral.component.scss',
	standalone: true,
	imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, NgFor, NgIf],
	animations: [
		trigger('columnAnimation', [
			transition('* => horizontal', [
				transition(':enter', [
					style({ opacity: 0, transform: 'translateX(-20px)' }),
					animate('500ms linear', style({ opacity: 1, transform: 'translateX(0)' }))
				]),
				transition(':leave', [animate('100ms linear', style({ opacity: 0, transform: 'translateX(-20px)' }))])
			]),
			transition('horizontal => *', [
				transition(':leave', [
					style({ opacity: 0, transform: 'translateX(-20px)' }),
					animate('500ms linear', style({ opacity: 1, transform: 'translateX(0)' }))
				]),
				transition(':enter', [animate('100ms linear', style({ opacity: 0, transform: 'translateX(-20px)' }))])
			]),
			// transition('void => vertical', [
			// 	style({ opacity: 0, height: 0, overflow: 'hidden' }),
			// 	animate('300ms ease-out', style({ opacity: 1, height: '*' }))
			// ]),
			//
			transition('* => vertical', [
				transition(':enter', [
					style({ height: 0, opacity: 0 }),
					animate('300ms ease-out', style({ height: '*', opacity: 1 }))
				]),
				transition(':leave', [animate('300ms ease-in', style({ height: 0, opacity: 0 }))])
			]),
			transition('* => *', [animate('300ms ease-in', style({ opacity: 0, height: 0 }))])
		])
	]
})
export class MenuLateralComponent implements OnInit, OnDestroy, AfterContentChecked {
	mobileQuery: MediaQueryList;

	fillerNav: Category[] = [
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
				{ name: 'Subcategoria 2.1' },
				{ name: 'Subcategoria 2.2', subcategories: [{ name: 'Item 2.2.1', subcategories: [{ name: 'Item 2.2.1.1' }] }] }
			]
		},
		{
			name: 'Categoria 3'
		}
	];

	private _mobileQueryListener: () => void;

	changeDetectorRef = inject(ChangeDetectorRef);
	media = inject(MediaMatcher);

	constructor() {
		this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
		this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);
	}

	ngOnInit(): void {
		this.changeDetectorRef.detectChanges();
	}

	ngAfterContentChecked(): void {
		this.changeDetectorRef.detectChanges();
	}

	isMobile = false;
	@HostListener('window:resize', ['$event'])
	@HostListener('window:load', ['$event'])
	onResize(event: Event) {
		console.log(event);
		this.isMobile = window.innerWidth <= 768;
		this.levels = [this.fillerNav];
	}

	levels: Category[][] = [this.fillerNav];
	//clicked = false;
	selectCategory(category?: Category, levelIndex?: number): void {
		//mantem aberto
		// this.levels = this.levels.slice(0, levelIndex);
		// if (category.subcategories) {
		// 	this.levels[levelIndex] = category.subcategories;
		// } else {
		// 	this.levels = [this.fillerNav];
		// }
		console.log(category, levelIndex);

		//toggle
		if (category == null) this.levels = [this.fillerNav];
		if (category && levelIndex) {
			if (this.levels[levelIndex] === category.subcategories) {
				this.levels = this.levels.slice(0, levelIndex);
				if (!category.subcategories) {
					this.levels = [this.fillerNav];
				}
			} else if (category.subcategories) {
				this.levels = this.levels.slice(0, levelIndex);
				if (category.subcategories) {
					this.levels[levelIndex] = category.subcategories;
				}
			} else {
				this.levels = [this.fillerNav];
			}
		}
	}

	showSubcategories?: boolean;
	toggleCategory(category: Category): void {
		console.log(category);
		category.expanded = !category.expanded;
	}

	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this._mobileQueryListener);
	}
}
