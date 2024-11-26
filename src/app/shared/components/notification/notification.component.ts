import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { NotificationService } from './notification.service';
import { NotificationLayoutComponent } from './notification-layout.component';
import { OverlayContainer } from '@angular/cdk/overlay';

export interface Category {
	name: string;
	subcategories?: Category[];
	expanded?: boolean;
}

@Component({
	selector: 'app-notification',
	templateUrl: './notification.component.html',
	standalone: true,
	imports: [MatFormFieldModule, MatSelectModule, MatButtonModule]
})
export class NotificationComponent implements OnInit {
	private _snackBar = inject(MatSnackBar);
	private cdr = inject(ChangeDetectorRef);
	private notificationService = inject(NotificationService);

	horizontalPosition: MatSnackBarHorizontalPosition = 'right';
	verticalPosition: MatSnackBarVerticalPosition = 'top';

	constructor() {}

	ngOnInit(): void {
		this.cdr.detectChanges();
		this.notificationService.message.subscribe((message) => this.openSnackBar(message));
	}

	openSnackBar(message: string, action?: string) {
		this._snackBar.dismiss();
		this._snackBar.openFromComponent(NotificationLayoutComponent, {
			horizontalPosition: this.horizontalPosition,
			verticalPosition: this.verticalPosition,
			data: { message }
		});
	}
}
