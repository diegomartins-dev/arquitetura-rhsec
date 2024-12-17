import { Component, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { AuthControllerService } from '../../../modules/auth/controllers/auth.controller.service';
import { Subcategory, SubmenuComponent } from '../side-menu/submenu/submenu.component';
import { NgStyle } from '@angular/common';
import { Category } from '../side-menu/sidemenu.component';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.scss',
	imports: [
		AvatarModule,
		ButtonModule,
		SidebarModule,
		RippleModule,
		StyleClassModule,
		PanelMenuModule,
		NgStyle,
		SubmenuComponent
	]
})
export class SidebarComponent implements OnInit {
	private authControllerService = inject(AuthControllerService);

	@Input() items: Category[] = [];
	@Input() sidebarVisible = false;
	@Output() closeSidebar = new EventEmitter<boolean>();
	@Output() outputClickSubmenu = new EventEmitter<boolean>();

	@ViewChild('sidebarRef') sidebarRef!: Sidebar;

	itemsBackup: any;

	ngOnInit(): void {
		this.itemsBackup = [...this.items];
		this.itemsBackup.push({ label: 'Logout', icon: 'logout', command: () => this.logout() });
	}

	closeCallback(e: any): void {
		this.sidebarRef.close(e);
	}

	clickSubmenu(event: Event) {
		event.stopPropagation();
		this.outputClickSubmenu.emit(true);
	}

	//Apenas para quando clicar em cima do icon do submenu, não se propagar o efeito e fechar o menu com this.outputClickSubmenu
	stopClickPropagation(event: Event) {
		event.stopPropagation();
	}

	logout() {
		this.authControllerService.logout();
	}
}
