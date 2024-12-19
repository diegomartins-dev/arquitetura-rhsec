import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';

import { LayoutService } from '../../../../../shared/services/layout/layout.service';
import { AuthControllerService } from '../../../../auth/controllers/auth.controller.service';
import { IAuth } from '../../../../auth/interfaces/auth.interface';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	standalone: true,
	imports: [ToolbarModule, RippleModule, SplitButtonModule, InputTextModule, ButtonModule, DropdownModule, FormsModule],
	providers: [AuthControllerService]
})
export class SettingsComponent implements OnInit {
	@Input() isMobile = false;
	@Output() openSidebar = new EventEmitter<boolean>();

	layoutService = inject(LayoutService);
	private authController = inject(AuthControllerService);

	user: IAuth = {
		id: '',
		name: '',
		email: '',
		password: '',
		role: ''
	};

	ngOnInit(): void {
		this.user = this.authController.getUserLogged();
		this.layoutService.initialize();
	}

	logout() {
		this.authController.logout();
	}

	changeTheme(theme: string) {
		this.layoutService.changeTheme(theme);
	}

	getThemeName(theme: string): string {
		return this.layoutService.getThemeName(theme);
	}

	changeFont(font: string) {
		this.layoutService.changeFont(font);
	}

	getFont(font: string): string {
		return this.layoutService.getFont(font);
	}

	openCloseSidebar() {
		this.openSidebar.emit(true);
	}
}
