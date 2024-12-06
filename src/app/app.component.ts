import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { LayoutService } from './shared/services/layout/layout.service';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet],
	styleUrls: ['./app.component.scss'],
	template: `<router-outlet></router-outlet>`
})
export class AppComponent {
	primengConfig = inject(PrimeNGConfig);
	layoutService = inject(LayoutService);

	ngOnInit() {
		this.primengConfig.ripple = true;
		this.layoutService.initialize();
	}
}
