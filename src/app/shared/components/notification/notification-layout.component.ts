import { NgClass, NgStyle } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef } from '@angular/material/snack-bar';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
	selector: 'app-notification-layout',
	template: `<div class="message" [ngClass]="type" matSnackBarLabel>
		<p data-test="notification-message">{{ message }}</p>
		<p>
			<span matSnackBarActions>
				<button mat-button matSnackBarAction (click)="close()" class="action" data-cy="notification-close-button">
					<mat-icon>close</mat-icon>
				</button>
			</span>
		</p>
	</div> `,
	styles: `
		::ng-deep .mat-mdc-snack-bar-container .mat-mdc-snackbar-surface {
			--mdc-snackbar-container-color: transparent;
			background-color: unset !important;
			box-shadow: none !important;
		}
		.message {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			color: white;
			background-color: var(--primary);
			border-radius: 4px;
			padding: 12px 24px;

			p {
				margin: 0;
				color: white;
			}

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
	imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction, NgClass, MatIcon, NgStyle]
})
export class NotificationLayoutComponent implements OnInit {
	type!: string;
	message!: string;
	snackBarRef = inject(MatSnackBarRef);
	overlayContainer = inject(OverlayContainer);
	static timeout: any;

	ngOnInit(): void {
		clearTimeout(NotificationLayoutComponent.timeout);
		this.message = this.snackBarRef.containerInstance.snackBarConfig.data.message.message;
		this.type = this.snackBarRef.containerInstance.snackBarConfig.data.message.type;
		this.show();

		NotificationLayoutComponent.timeout = setTimeout(() => {
			this.close();
		}, 5000);
	}

	close() {
		this.hide();
	}

	hide() {
		const overlayContainerElement = this.overlayContainer.getContainerElement();
		overlayContainerElement.classList.remove('show-overlay');
		overlayContainerElement.classList.add('hide-overlay');
	}

	show() {
		const overlayContainerElement = this.overlayContainer.getContainerElement();
		overlayContainerElement.classList.remove('hide-overlay');
		overlayContainerElement.classList.add('show-overlay');
	}
}
