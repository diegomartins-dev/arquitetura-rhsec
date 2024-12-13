import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Injectable({
  providedIn: 'root',
})
export class PushNotificationService {
  readonly VAPID_PUBLIC_KEY = '<sua-chave-vapid-publica>';

  constructor(private swPush: SwPush) {}

  subscribeToNotifications() {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((subscription) => {
        console.log('Subscrição criada: ', subscription);
        // Aqui você poderia enviar a subscrição ao backend
      })
      .catch((err) =>
        console.error('Erro ao criar subscrição de notificações', err)
      );
  }
}
