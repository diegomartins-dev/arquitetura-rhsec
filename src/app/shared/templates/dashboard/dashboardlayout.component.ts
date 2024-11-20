import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';

import { AuthControllerService } from '../../../modules/auth/controllers/auth.controller.service';
import { IAuth } from '../../../modules/auth/interfaces/auth.interface';
import { MenuDefinitivoComponent } from '../../components/menu-definitivo/menu-definitivo.component';

@Component({
	selector: 'app-dashboard-layout',
	templateUrl: './dashboard.layout.component.html',
	standalone: true,
	imports: [MenuDefinitivoComponent, RouterOutlet, MatToolbarModule, MatIcon, MatButtonModule],
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
