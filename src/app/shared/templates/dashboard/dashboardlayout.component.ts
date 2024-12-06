import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AuthControllerService } from '../../../modules/auth/controllers/auth.controller.service';
import { IAuth } from '../../../modules/auth/interfaces/auth.interface';
import { SideMenuComponent } from '../../components/side-menu/sidemenu.component';
import { DashboardHeaderComponent } from '../../components/dashboard/header/header.component';
import { NotificationComponent } from '../../components/notification/notification.component';

@Component({
	selector: 'app-dashboard-layout',
	templateUrl: './dashboard.layout.component.html',
	standalone: true,
	imports: [RouterOutlet, SideMenuComponent, DashboardHeaderComponent, NotificationComponent],
	providers: [AuthControllerService],
	styles: [
		`
			.example-spacer {
				flex: 1 1 auto;
			}
		`
	]
})
export class DashboardLayoutComponent implements OnInit {
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
	}

	logout() {
		this.authController.logout();
	}
}
