import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CtchuyenngoaidtoService {
  initFlg = true;
  id = "";
  idchuyenngoai = {}; // mã chyến hàng
  tenhang = "";
  diadiembochang = "";  // 
  tiencuoc = 0;
  tiencuocxengoai = 0;
  htttxengoai = 0;
  htttkhachhang = 0;
  tennguoinhan = "";
  sdtnguoinhan = "";
  diachinguoinhan = "";
  status01 = 0; // 
  status02 = 0; 
  status03 = 0; 
  status04 = 0;
  status05 = 0;
  ghichu = ""

  constructor() { }

  clear() {
    this.initFlg = true;
    this.id = "";
    this.idchuyenngoai = {};
    this.tenhang = "";
    this.diadiembochang = "";
    this.tiencuoc = 0;
    this.tiencuocxengoai = 0;
    this.htttxengoai = 0;
    this.htttkhachhang = 0;
    this.tennguoinhan = "";
    this.sdtnguoinhan = "";
    this.diachinguoinhan = "";
    this.status01 = 0; // = 0 : moi khoi tao. = 1 đã thêm vào db và có thể chỉnh sữa. 2 khóa chỉnh sửa
    this.status02 = 0; 
    this.status03 = 0; 
    this.status04 = 0;
    this.status05 = 0;
    this.ghichu = ""
  }
}
