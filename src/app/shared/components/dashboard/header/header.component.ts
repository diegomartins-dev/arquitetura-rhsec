import { Component, EventEmitter, inject, Input, OnInit, Output, output } from '@angular/core';
import { AuthControllerService } from '../../../../modules/auth/controllers/auth.controller.service';
import { IAuth } from '../../../../modules/auth/interfaces/auth.interface';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { LayoutService } from '../../../services/layout/layout.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { NgClass } from '@angular/common';

@Component({
	selector: 'app-dashboard-header',
	templateUrl: './header.component.html',
	standalone: true,
	imports: [ToolbarModule, SplitButtonModule, InputTextModule, ButtonModule, NgClass],
	providers: [AuthControllerService],
	styleUrls: ['./header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {
	@Input() isMobile = false;
	@Output() openSidebar = new EventEmitter<boolean>();

	layoutService = inject(LayoutService);

	user: IAuth = {
		id: '',
		name: '',
		email: '',
		password: '',
		role: ''
	};

	private authController = inject(AuthControllerService);

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
