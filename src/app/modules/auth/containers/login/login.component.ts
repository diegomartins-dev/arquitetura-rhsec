import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { merge } from 'rxjs';

import { NotificationComponent } from '../../../../shared/components/notification/notification.component';
import { AuthControllerService } from '../../controllers/auth.controller.service';
import { HttpService } from '../../../../core/http/http.service';
import { IProvider } from '../../../../core/interface/iprovider.interface';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { NgClass } from '@angular/common';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule,
		ButtonModule,
		InputTextModule,
		FloatLabelModule,
		NotificationComponent,
		NgClass
	],
	providers: [AuthControllerService],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent {
	readonly email = new FormControl('', [Validators.required, Validators.email]);
	readonly password = new FormControl('', [Validators.required]);

	errorMessage = signal<{ email?: string; password?: string }>({});

	authController = inject(AuthControllerService);

	constructor() {}

	updateErrorMessage() {
		console.log(this.errorMessage());
		if (this.email.hasError('required')) {
			this.errorMessage.update((oldValues) => ({ ...oldValues, email: 'Campo email é obrigatório' }));
		}

		if (this.email.hasError('email')) {
			this.errorMessage.update((oldValues) => ({ ...oldValues, email: 'Informe um email válido' }));
		}

		if (this.password.hasError('required')) {
			this.errorMessage.update((oldValues) => ({ ...oldValues, password: 'Campo senha é obrigatório' }));
		}

		if (this.email.valid && this.password.valid) {
			this.errorMessage.set({});
		}
	}

	login(event: any) {
		event.preventDefault();
		if (this.email.invalid || this.password.invalid) this.updateErrorMessage();
		this.authController.login(this.email, this.password);
	}
}
