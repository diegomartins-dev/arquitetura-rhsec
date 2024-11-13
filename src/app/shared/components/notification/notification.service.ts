import { Injectable, EventEmitter } from '@angular/core';
import { Notification } from './notification.interface';

@Injectable({
	providedIn: 'root'
})
export class NotificationService implements Notification {
	message = new EventEmitter();

	constructor() {}

	success(message: string): void {
		this.message.emit({ type: 'success', message });
	}

	error(message: string): void {
		this.message.emit({ type: 'error', message });
	}
}
