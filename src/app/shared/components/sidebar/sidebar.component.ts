import { NgStyle } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { RippleModule } from 'primeng/ripple';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { StyleClassModule } from 'primeng/styleclass';

import { AuthControllerService } from '../../../modules/auth/controllers/auth.controller.service';
import { Category } from '../side-menu/sidemenu.component';
import { Subcategory } from '../side-menu/submenu/submenu.component';
import { Router } from '@angular/router';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.scss',
	imports: [AvatarModule, ButtonModule, SidebarModule, RippleModule, StyleClassModule, PanelMenuModule, MenuModule]
})
export class SidebarComponent implements OnInit {
	private authControllerService = inject(AuthControllerService);
	private router = inject(Router);

	@Input() items: Category[] = [];
	@Input() sidebarVisible = false;
	@Output() closeSidebar = new EventEmitter<boolean>();
	@Output() outputClickSubmenu = new EventEmitter<boolean>();

	@ViewChild('sidebarRef') sidebarRef!: Sidebar;

	itemsBackup: any;
	subcategoryExpanded?: Subcategory;

	ngOnInit(): void {
		this.itemsBackup = this.items;
	}

	onClick(target: any): void {
		if (target.notExpandIcon) return;
		if (target.id != this.subcategoryExpanded?.id) {
			target.expanded = !target.expanded;
		} else target.expanded = false;
	}

	onCloseSidebar() {
		this.itemsBackup = this.onClosePanel(this.itemsBackup);
		this.closeSidebar.emit(true);
	}

	onClosePanel(item: any) {
		return item.map((i: Subcategory) => {
			i.expanded = false;
			if (i?.items) this.onClosePanel(i.items);
			return i;
		});
	}

	onGoToPage(page: string) {
		this.itemsBackup = this.onClosePanel(this.itemsBackup);
		this.closeSidebar.emit(true);
		this.router.navigateByUrl(page);
	}

	logout() {
		this.authControllerService.logout();
	}
}
