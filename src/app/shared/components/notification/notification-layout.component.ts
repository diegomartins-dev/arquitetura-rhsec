import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
	selector: 'app-notification-layout',
	template: `<div class="message" [ngClass]="type" matSnackBarLabel data-test="notification-message">
		{{ message }}
		<span matSnackBarActions>
			<button
				mat-button
				matSnackBarAction
				(click)="snackBarRef.dismissWithAction()"
				class="action"
				data-cy="notification-close-button"
			>
				<mat-icon>close</mat-icon>
			</button>
		</span>
	</div> `,
	styles: `
		::ng-deep .mat-mdc-snack-bar-container .mat-mdc-snackbar-surface {
			--mdc-snackbar-container-color: transparent;
		}
		.message {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			color: white;
			background-color: var(--primary);
			border-radius: 4px;

			.action {
				color: white;
				background-color: rgba(0, 0, 0, 0.1);

				mat-icon {
					margin: 0;
					padding: 0;
				}
			}

			&.success {
				background-color: var(--primary) !important;
			}

			&.error {
				background-color: var(--red) !important;
			}
		}
	`,
	standalone: true,
	imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction, NgClass, MatIcon]
})
export class NotificationLayoutComponent implements OnInit {
	type!: string;
	message!: string;
	snackBarRef = inject(MatSnackBarRef);

	ngOnInit(): void {
		this.message = this.snackBarRef.containerInstance.snackBarConfig.data.message.message;
		this.type = this.snackBarRef.containerInstance.snackBarConfig.data.message.type;
	}
}
