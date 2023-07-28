import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../base-http.service';
import * as Const from 'src/app/common/const';
import { Dichvuthuengoai } from '@app/core/model/tmt060_dichvuthuengoai.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: BaseHttpService
  ) { }

  requestInit(params: any) : Observable<any> {
    return this.http.post(Const.CommonAnt100RequestInt, params, { needSuccessInfo: false});
  }

  // get list thông kê doanh thu, chi phi, lợi nhuận từng tháng
  listtaichinh(params: any) : Observable<any> {
    return this.http.post(Const.CommonAnt100Listtaichinh, params, { needSuccessInfo: false});
  }

  // thông kê tài chinh năm bao gồi lợi nhuận . chi phí và doanh số trong năm
  thongketaichinhnam(params : any) : Observable<any> {
    return this.http.post(Const.CommonAnt100Thongketaichinhnam, params, { needSuccessInfo: false});
  }

  // get tổng chuyến hàng trong năm // params năm cần get
  tongchuyenhangtrongnam(params: any) : Observable<any> {
    return this.http.post(Const.CommonAnt100Tongchuyenhangtrongnam, params, { needSuccessInfo: false});
  }

  // tính tống nợ tất cả khách hàng
  tongnoAll(params: any) : Observable<any> {
    return this.http.post(Const.CommonAnt100Tongnoall, params, { needSuccessInfo: false});
  }
  // tính tống nợ 1 khách hàng
  tongnoUser(params: any) : Observable<any> {
    return this.http.post(Const.CommonAnt100Tongnouser, params, { needSuccessInfo: false});
  }

  // list top 10 khách hàng có doanh thu cao nhất
  listtopdoanhthu(params: any) : Observable<any> {
    return this.http.post(Const.CommonAnt100Listtopdoanhthu, params, { needSuccessInfo: false});
  }

  // list top chi phí cao nhất
  listtopchiphi(params: any): Observable<any> {
    return this.http.post(Const.CommonAnt100Listtopchiphi, params, { needSuccessInfo: false});
  }

  // list top tổng cước của từng xe
  listtoptongcuoctungxe(params: any) : Observable<any> {
    return this.http.post(Const.CommonAnt100Listtoptongcuoctungxe, params, { needSuccessInfo: false});
  }
  // Tính tổng nợ xe ngoài
  Tinhtongnoxengoai() : Observable<any> {
    return this.http.post(Const.CommonAnt100Tongnoxengoai, { needSuccessInfo: false});
  }
  // get ODN
  getODN(): Observable<any> {
    return this.http.post(Const.CommonAnt100GetODN, { needSuccessInfo: false});
  }
  /// get ODT
  getODT(): Observable<any> {
    return this.http.post(Const.CommonAnt100GetODT, { needSuccessInfo: false});
  }
  /// get SoHDTTCNKH
  getSoHDTTCNKH(): Observable<any> {
    return this.http.post(Const.CommonAnt100GetSoHDTTCNKH, { needSuccessInfo: false});
  }

  /// get HDTTXN
  getHDTTXN(): Observable<any> {
    return this.http.post(Const.CommonAnt100GetHDTTXN, { needSuccessInfo: false});
  }

  // get list ID
  getListSoID(params: any): Observable<any> {
    return this.http.post(Const.CommonAnt100GetListSoID,params, { needSuccessInfo: false});
  }

  // list dich vụ xe cau
  getListDichvuxecau() : Observable<Dichvuthuengoai[]> {
    return this.http.post(Const.CommonAnt100GetListDichvuXeCau, { needSuccessInfo: false})
  }

  // list dịch vu boc xep
  getListDichvubocxep() : Observable<Dichvuthuengoai[]> {
    return this.http.post(Const.CommonAnt100GetListDichvuBocXep, { needSuccessInfo: false})
  }
}
