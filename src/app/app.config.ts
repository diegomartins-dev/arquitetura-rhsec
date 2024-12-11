import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpService } from './core/http/http.service';
import { IProvider } from './core/interface/iprovider.interface';
import { InMemoryService } from './core/in-memory/in-memory.service';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({}),
		provideRouter(routes),
		provideAnimationsAsync(),
		provideHttpClient(),
		{
			provide: IProvider,
			useClass: InMemoryService
		}, provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })
	]
};
