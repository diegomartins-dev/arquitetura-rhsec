import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Category } from '../menu-lateral.component';

@Component({
	selector: 'app-menu-vertical',
	templateUrl: 'menu-vertical.component.html',
	styleUrl: 'menu-vertical.component.scss',
	standalone: true,
	imports: [MatIconModule, MatSidenavModule, MatListModule, NgFor, NgIf]
})
export class MenuVerticalComponent {
	@Input() item?: Category[] | undefined;
	@Input() levelIndex!: number;
	@Input() isMobile: boolean = false;

	expanded = false;

	toggleSubcategory(index: number): void {
		console.log(index);
		if (this.item && this.item[index]) this.item[index].expanded = !this.item[index].expanded;
	}
}
