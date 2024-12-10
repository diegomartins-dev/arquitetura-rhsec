import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';

import { NotificationService } from './notification.service';

export interface Category {
	name: string;
	subcategories?: Category[];
	expanded?: boolean;
}

@Component({
	selector: 'app-notification',
	templateUrl: './notification.component.html',
	standalone: true,
	imports: [ToastModule, RippleModule],
	providers: [MessageService]
})
export class NotificationComponent implements OnInit {
	private cdr = inject(ChangeDetectorRef);
	private notificationService = inject(NotificationService);
	private messageService = inject(MessageService);

	ngOnInit(): void {
		this.cdr.detectChanges();
		this.notificationService.message.subscribe((data) => this.openNotification(data.type, data.message));
	}

	openNotification(type: string, message: string) {
		this.messageService.add({ severity: type, detail: message, life: 5000 });
	}
}
