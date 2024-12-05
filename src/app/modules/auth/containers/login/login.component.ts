import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';

import { NotificationComponent } from '../../../../shared/components/notification/notification.component';
import { AuthControllerService } from '../../controllers/auth.controller.service';
import { HttpService } from '../../../../core/http/http.service';
import { IProvider } from '../../../../core/interface/iprovider.interface';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		FormsModule,
		MatFormFieldModule,
		MatLabel,
		ReactiveFormsModule,
		MatInputModule,
		MatButton,
		NotificationComponent
	],
	providers: [AuthControllerService],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent {
	readonly email = new FormControl('', [Validators.required, Validators.email]);
	readonly password = new FormControl('', [Validators.required]);

	errorMessage: any = signal({});

	authController = inject(AuthControllerService);

	constructor() {
		merge(this.email.statusChanges, this.email.valueChanges)
			.pipe(takeUntilDestroyed())
			.subscribe(() => this.updateErrorMessage());
	}

	updateErrorMessage() {
		if (this.email.hasError('required')) {
			this.errorMessage.set({ ...this.errorMessage(), email: 'Campo email é obrigatório' });
		}
		if (this.email.hasError('email')) {
			this.errorMessage.set({ ...this.errorMessage(), email: 'Informe um email válido!' });
		}
		if (this.password.hasError('required')) {
			this.errorMessage.set({ ...this.errorMessage(), password: 'Campo senha é obrigatório' });
		}
		if (this.password.valid && this.email.valid) {
			this.errorMessage.set({});
		}
	}

	login() {
		if (this.email.invalid && this.password.invalid) this.updateErrorMessage();
		this.authController.login(this.email, this.password);
	}
}
