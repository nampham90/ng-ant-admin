import { Injectable } from '@angular/core';
import { Chuyenngoai } from '@app/core/model/chuyenngoai.model'
@Injectable({
  providedIn: 'root'
})
export class ChuyenngoaidtoService {
  initFlg = true;
  id = "";
  ngaynhap = "";
  ngayvanchuyen = ""; // ngày vận chuyển
  ngaydukiengiaohang = "";// ngày dự kiến giao hàng
  nguonxe = {};
  biensoxe = ""; // biển số xe ngoài
  sdtnguonxe  = ""; // so dien thoai nguon xe
  tentaixe = ""; // tài xế
  sodienthoai = "";// điện thoại tài xế
  listID = [];
  status01 = 0; // 0. chuyến đang hoat động. 1. chuyến đã kết thúc
  status02 = 0;
  status03 = 0;
  status04 = 0;
  status05 = 0;
  ghichu = "";
  mode = "";

  constructor() { }

  clear() {
    this.initFlg = true;
    this.id = "";
    this.ngaynhap = "";
    this.ngayvanchuyen = "";
    this.ngaydukiengiaohang = "";
    this.nguonxe = {};
    this.biensoxe = "";
    this.sdtnguonxe = "";
    this.tentaixe = "";
    this.listID = [];
    this.status01 = 0; // 0. chuyến đang hoat động. 1. chuyến đã kết thúc
    this.status02 = 0;
    this.status03 = 0;
    this.status04 = 0;
    this.status05 = 0;
    this.ghichu = "";
    this.mode = "";
  }
}
