import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import {
	AfterContentChecked,
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostListener,
	OnChanges,
	OnDestroy,
	OnInit,
	SimpleChanges,
	ViewChild,
	inject
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { MenuVerticalComponent } from './menu-vertical/menu-vertical.component';

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
		MenuVerticalComponent
	],
	animations: [
		trigger('columnAnimation', [
			transition(':enter', [
				style({ opacity: 0, transform: 'translateX(-20px)' }),
				animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
			]),
			transition(':leave', [animate('300ms ease-in', style({ opacity: 0, transform: 'translateX(-20px)' }))])
		]),
		trigger('expandDown', [
			transition(':enter', [
				style({ opacity: 0, transform: 'translateY(-20px)' }),
				animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
			]),
			transition(':leave', [animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(20px)' }))])
		])
	]
})
export class MenuLateralComponent implements OnInit, OnDestroy {
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

	constructor(private breakpointObserver: BreakpointObserver) {
		this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
		this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);
	}
	ngOnInit(): void {
		this.changeDetectorRef.detectChanges();
		this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
			this.isMobile = result.matches;
		});
	}

	menuOpened = false;

	isMobile = false;
	@HostListener('window:resize', ['$event'])
	@HostListener('window:load', ['$event'])
	onResize(event: Event) {
		this.isMobile = window.innerWidth <= 768;
		this.levels = [this.fillerNav];
		this.menuOpened = false;
	}

	levels: Category[][] = [this.fillerNav];
	closeMenu(): void {
		this.levels = [this.fillerNav];
		this.menuOpened = false;
	}

	toggleSubcategory(category: Category, levelIndex: number): void {
		if (this.isMobile) {
			category.expanded = !category.expanded;
		} else {
			if (this.levels[levelIndex] === category.subcategories) {
				this.levels = this.levels.slice(0, levelIndex);
			} else {
				this.levels = this.levels.slice(0, levelIndex);
				if (category.subcategories) {
					this.levels[levelIndex] = category.subcategories;
				}
			}
		}
	}

	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this._mobileQueryListener);
	}
}
