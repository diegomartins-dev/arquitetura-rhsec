import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { NotificationService } from '../components/notification/notification.service'; // Atualize o caminho conforme necessário

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:8080'); // URL do servidor Socket.IO
  }

  listen(eventName: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      });
    });
  }

  disconnect() {
    this.socket.disconnect();
  }
}
