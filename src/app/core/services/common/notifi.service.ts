import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotifiService {
  status = true;
  lstsystem = [];
  lstnotifi = [];
  lstvison = [];
  constructor() { }

  totalNotifi(){
    return (this.lstsystem.length + this.lstnotifi.length + this.lstvison.length);
  }

  clear() {
    this.status = true;
    this.lstsystem = [];
    this.lstnotifi = [];
    this.lstvison = [];
  }
}
