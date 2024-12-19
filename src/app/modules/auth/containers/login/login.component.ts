import { Component, inject, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputFieldComponent } from '../../../../shared/components/forms/input-field/input-field.component';
import { NotificationComponent } from '../../../../shared/components/notification/notification.component';
import { AuthControllerService } from '../../controllers/auth.controller.service';
import { InputMaskComponent } from '../../../../shared/components/forms/input-mask/input-mask.components';

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
    InputMaskComponent,
		InputFieldComponent,
		ButtonComponent
	],
	providers: [AuthControllerService],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent {
	readonly cpf = new FormControl('', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]);
	readonly password = new FormControl('', [Validators.required]);

	errorMessage = signal<{ cpf?: string; password?: string }>({});

	authController = inject(AuthControllerService);

	updateErrorMessage() {
		if (this.cpf.hasError('required')) {
			this.errorMessage.update((oldValues) => ({ ...oldValues, cpf: 'Campo cpf é obrigatório' }));
		}

		if (this.cpf.hasError('cpf')) {
			this.errorMessage.update((oldValues) => ({ ...oldValues, cpf: 'Informe um cpf válido' }));
		}

		if (this.password.hasError('required')) {
			this.errorMessage.update((oldValues) => ({ ...oldValues, password: 'Campo senha é obrigatório' }));
		}

		if (this.cpf.valid && this.password.valid) {
			this.errorMessage.set({});
		}
	}

	login(event: any) {
		event.preventDefault();
		console.log(this.cpf)
		if (this.cpf.invalid || this.password.invalid) this.updateErrorMessage();
		this.authController.login(this.cpf, this.password);
	}
}
