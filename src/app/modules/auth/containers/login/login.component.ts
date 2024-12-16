import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { NotificationComponent } from '../../../../shared/components/notification/notification.component';
import { AuthControllerService } from '../../controllers/auth.controller.service';
import { InputFieldComponent } from '../../../../shared/components/forms/input-field/input-field.component';

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
		InputFieldComponent,
		ButtonComponent
	],
	providers: [AuthControllerService],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
	readonly email = new FormControl('', [Validators.required, Validators.email]);
	readonly password = new FormControl('', [Validators.required]);

	errorMessage = signal<{ email?: string; password?: string }>({});

	cdr = inject(ChangeDetectorRef);
	authController = inject(AuthControllerService);

	ngOnInit() {
		this.cdr.detectChanges();
	}

	updateErrorMessage() {
		if (this.email.hasError('required')) {
			this.errorMessage.update((oldValues) => ({ ...oldValues, email: 'Campo email é obrigatório' }));
		} else if (!this.email.hasError('required') && !this.email.hasError('email')) {
			this.errorMessage.update((oldValues) => ({ ...oldValues, email: '' }));
		}

		if (this.email.hasError('email')) {
			this.errorMessage.update((oldValues) => ({ ...oldValues, email: 'Informe um email válido' }));
		} else if (!this.email.hasError('required') && !this.email.hasError('email')) {
			this.errorMessage.update((oldValues) => ({ ...oldValues, email: '' }));
		}

		if (this.password.hasError('required')) {
			this.errorMessage.update((oldValues) => ({ ...oldValues, password: 'Campo senha é obrigatório' }));
		} else {
			this.errorMessage.update((oldValues) => ({ ...oldValues, password: '' }));
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
