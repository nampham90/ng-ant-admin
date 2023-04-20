import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class IpService {

  ip = "";

  constructor() { }

  clear() {
    this.ip = "";
  }

}
