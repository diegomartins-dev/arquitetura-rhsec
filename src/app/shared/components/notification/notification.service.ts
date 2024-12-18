import { Injectable, EventEmitter } from '@angular/core';
import { Notification } from './notification.interface';

export interface IMessage {
	type: 'success' | 'info' | 'warning' | 'error' | 'secondary' | 'contrast';
	message: string;
}

@Injectable({
	providedIn: 'root'
})
export class NotificationService implements Notification {
	message = new EventEmitter<IMessage>();

	success(message: string): void {
		setTimeout(() => {
			this.message.emit({ type: 'success', message: message.trim() });
		}, 300);
	}

	error(message: string): void {
		setTimeout(() => {
			this.message.emit({ type: 'error', message: message.trim() });
		}, 300);
	}
}
