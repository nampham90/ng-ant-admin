import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket = io('http://localhost:3000');

  constructor() {}

  on(eventName: string, callback: any) {
    this.socket.on(eventName, callback);
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

}
