import { DatePipe, NgClass } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';

import { AuthControllerService } from '../../../../modules/auth/controllers/auth.controller.service';
import { IAuth } from '../../../../modules/auth/interfaces/auth.interface';
import { LayoutService } from '../../../services/layout/layout.service';

@Component({
	selector: 'app-dashboard-header',
	templateUrl: './header.component.html',
	standalone: true,
	imports: [ToolbarModule, SplitButtonModule, InputTextModule, ButtonModule, NgClass, DatePipe],
	providers: [AuthControllerService, DatePipe],
	styleUrls: ['./header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
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

	datetime: Date = new Date();

	ngOnInit(): void {
		this.user = this.authController.getUserLogged();
		this.layoutService.initialize();
	}

	logout() {
		this.authController.logout();
	}

	openCloseSidebar() {
		this.openSidebar.emit(true);
	}
}
