import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Spin00251dtoService {
  initFlg = true;
  soID = "";
  iduser = "";
  usernm = ""
  hinhthucthanhtoan = "1";
  ghichu = "";
  listsp : any[]= [];
  mode = "";
  constructor() { }

  clear() {
     this.initFlg = true;
     this.soID = "";
     this.iduser = "";
     this.usernm = "";
     this.hinhthucthanhtoan = "1";
     this.ghichu = "";
     this.listsp = [];
     this.mode = "";
  }
}
