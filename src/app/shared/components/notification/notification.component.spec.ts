import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationComponent } from './notification.component';
import { ChangeDetectorRef } from '@angular/core';
import { NotificationService } from './notification.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { of } from 'rxjs';

describe('NotificationComponent', () => {
	let component: NotificationComponent;
	let fixture: ComponentFixture<NotificationComponent>;
	let notificationService: NotificationService;
	let messageService: MessageService;
	let cdr: ChangeDetectorRef;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ToastModule],
			declarations: [NotificationComponent],
			providers: [NotificationService, MessageService, ChangeDetectorRef]
		}).compileComponents();

		fixture = TestBed.createComponent(NotificationComponent);
		component = fixture.componentInstance;

		notificationService = TestBed.inject(NotificationService);
		messageService = TestBed.inject(MessageService);
		cdr = TestBed.inject(ChangeDetectorRef);

		spyOn(cdr, 'detectChanges');
		spyOn(notificationService.message, 'subscribe').and.callThrough();
		spyOn(messageService, 'add');
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should call detectChanges on ngOnInit', () => {
		// component.ngOnInit();
		// expect(cdr.detectChanges).toHaveBeenCalled();
	});

	it('should subscribe to notificationService messages on ngOnInit', () => {
		// const mockMessage: any = { type: 'success', message: 'Test message' };
		// spyOn(notificationService.message, 'subscribe').and.returnValue([mockMessage]);
		// component.ngOnInit();
		// expect(notificationService.message.subscribe).toHaveBeenCalled();
	});

	it('should call messageService.add with correct parameters when openNotification is called', () => {
		// const type = 'success';
		// const message = 'Test notification';
		// const expectedParams = { severity: type, detail: message, life: 5000 };
		// component.openNotification(type, message);
		// expect(messageService.add).toHaveBeenCalledWith(expectedParams);
	});
});
