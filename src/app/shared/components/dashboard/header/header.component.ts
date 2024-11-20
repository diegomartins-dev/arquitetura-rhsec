import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthControllerService } from '../../../../modules/auth/controllers/auth.controller.service';
import { IAuth } from '../../../../modules/auth/interfaces/auth.interface';

@Component({
	selector: 'app-dashboard-header',
	templateUrl: './header.component.html',
	standalone: true,
	imports: [MatToolbarModule, MatIconModule, MatButtonModule],
	providers: [AuthControllerService],
	styles: [
		`
			.example-spacer {
				flex: 1 1 auto;
			}
		`
	]
})
export class DashboardHeaderComponent implements OnInit {
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
