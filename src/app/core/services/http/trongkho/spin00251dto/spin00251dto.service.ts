import { Injectable } from '@angular/core';
import { Phieunhaphang } from '@app/core/model/phieunhaphang.model';

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
  listsp : Phieunhaphang[]= [];
  mode = "";
  backurl = ""
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
     this.backurl = "";
  }
}
