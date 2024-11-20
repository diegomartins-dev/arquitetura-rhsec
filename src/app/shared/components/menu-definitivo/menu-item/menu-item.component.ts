import { CdkAccordionModule } from '@angular/cdk/accordion';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Category } from '../menu-definitivo.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
	selector: 'app-item-menu',
	templateUrl: './menu-item.component.html',
	styleUrl: './menu-item.component.scss',
	standalone: true,
	imports: [
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
		MatSidenavModule,
		MatListModule,
		CdkAccordionModule,
		MatExpansionModule,
		RouterLink,
		RouterLinkActive
	]
})
export class MenuItemComponent {
	@Input() menuCategory?: Category[];
	readonly panelOpenState = signal(false);
}
