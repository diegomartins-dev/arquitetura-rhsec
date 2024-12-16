import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err))
;
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/ngsw-worker.js').then((registration) => {
      console.log('Angular Service Worker registrado:', registration);

      // Registra o Service Worker customizado
      navigator.serviceWorker.register('/custom-sw.js').then((customRegistration) => {
        console.log('Custom Service Worker registrado:', customRegistration);
      }).catch((err) => {
        console.error('Erro ao registrar o Custom Service Worker:', err);
      });
    }).catch((err) => {
      console.error('Erro ao registrar o Angular Service Worker:', err);
    });
  });
}
