import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AuthControllerService } from '../../../modules/auth/controllers/auth.controller.service';
import { IAuth } from '../../../modules/auth/interfaces/auth.interface';
import { SideMenuComponent } from '../../components/side-menu/sidemenu.component';
import { NotificationComponent } from '../../components/notification/notification.component';
import { AdminHeaderComponent } from '../../components/admin/header/header.component';

@Component({
	selector: 'app-admin-template',
	templateUrl: './admin.template.component.html',
	standalone: true,
	imports: [RouterOutlet, SideMenuComponent, AdminHeaderComponent, NotificationComponent],
	providers: [AuthControllerService]
})
export class AdminTemplateComponent implements OnInit {
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
