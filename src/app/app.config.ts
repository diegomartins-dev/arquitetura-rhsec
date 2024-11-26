import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpService } from './core/http/http.service';
import { IProvider } from './core/interface/iprovider.interface';
import { InMemoryService } from './core/in-memory/in-memory.service';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideAnimationsAsync(),
		provideHttpClient(),
		{
			provide: IProvider,
			useClass: InMemoryService
		}
	]
};
