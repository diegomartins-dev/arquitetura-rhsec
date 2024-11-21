import { CanActivateFn, Router } from '@angular/router';
import { AuthControllerService } from '../controllers/auth.controller.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
	let authControllerService = inject(AuthControllerService);
	let routerNavigate = inject(Router);

	if (!state.url.includes('login')) {
		let user = authControllerService.getUserLogged();
		if (!user.id) {
			routerNavigate.navigateByUrl('/auth/login');
			return false;
		}
	}
	return true;
};
