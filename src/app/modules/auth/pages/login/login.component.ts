import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';

import { NotificationComponent } from '../../../../shared/components/notification/notification.component';
import { AuthController } from '../../controllers/auth.controller';

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
	providers: [AuthController],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent {
	readonly email = new FormControl('', [Validators.required, Validators.email]);
	readonly password = new FormControl('', [Validators.required]);

	errorMessage: any = signal({});

	readonly authController = inject(AuthController);

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
		this.authController.login(this.email, this.password);
	}
}
