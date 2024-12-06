import { Component, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { AuthControllerService } from '../../../modules/auth/controllers/auth.controller.service';
import { Subcategory } from '../side-menu/submenu/submenu.component';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	templateUrl: './sidebar.component.html',
	imports: [AvatarModule, ButtonModule, SidebarModule, RippleModule, StyleClassModule, PanelMenuModule]
})
export class SidebarComponent implements OnInit {
	private authControllerService = inject(AuthControllerService);

	@Input() items: any[] = [];
	@Input() sidebarVisible = false;
	@Output() closeSidebar = new EventEmitter<boolean>();

	@ViewChild('sidebarRef') sidebarRef!: Sidebar;

	itemsBackup: any;

	ngOnInit(): void {
		this.itemsBackup = [...this.items];
		this.itemsBackup.push({ label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() });
	}

	closeCallback(e: any): void {
		this.sidebarRef.close(e);
	}

	logout() {
		this.authControllerService.logout();
	}
}
