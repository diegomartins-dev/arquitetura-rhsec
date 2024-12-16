import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebPushService {
  private publicVapidKey = 'BCmeWuOiBMSl0_e3BsCX2o0Nj7dC-PNhiUS_vpAUJlRhX5xhJXg8ZRBmECUBtTO42ZmfYmMaT6fNwr6b543dsww'; // Sua chave pública VAPID

  constructor() {}

  async requestNotificationPermission(): Promise<void> {
    try {
      // Solicita permissão do usuário para notificações
      const permission = await Notification.requestPermission();

      if (permission !== 'granted') {
        console.warn('Permissão para notificações negada.');
        return;
      }
      console.log('Permissão concedida.');

      // Registra o Angular Service Worker
      const registration = await navigator.serviceWorker.ready;

      // Gera PushSubscription
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(this.publicVapidKey),
      });
      console.log('Push Subscription:', subscription);

      // Envia a PushSubscription ao servidor backend
      await this.sendSubscriptionToServer(subscription);
    } catch (error) {
      console.error('Erro ao configurar notificações Push:', error);
    }
  }

  private async sendSubscriptionToServer(subscription: PushSubscription): Promise<void> {
    // Substitua com a URL da API do backend
    const response = await fetch('http://localhost:8080/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscription),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error('Falha ao enviar PushSubscription para o servidor.');
    }
    console.log('PushSubscription enviada com sucesso.');
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    return Uint8Array.from(atob(base64String.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));
  }
  
  
}
