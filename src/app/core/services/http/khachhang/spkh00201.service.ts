import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../base-http.service';
import * as Const from '@app/common/const'
@Injectable({
  providedIn: 'root'
})
export class Spkh00201Service {

  constructor(
    private http: BaseHttpService,
  ) { }

  getlists(params:any): Observable<any>{
    return this.http.post(Const.Spkh00201Ant100GetAll, params, {needSuccessInfo: false});
  }

  xuatpdf(params:any): Observable<any>{
    return this.http.post(Const.Spkh00201Ant100XuatPdf, params, {needSuccessInfo: false});
  }

  thanhtoanhoadon(sohdttcnkh: string) : Observable<number> {
    return this.http.post(Const.Spkh00201Ant100Thanhtoan, {sohdttcnkh: sohdttcnkh}, {needSuccessInfo: false})
  }
  huythanhtoan(sohdttcnkh: string) : Observable<number> {
    return this.http.post(Const.Spkh00201Ant100Huythanhtoan, {sohdttcnkh: sohdttcnkh}, {needSuccessInfo: false})
  }
  phathanhlai(sohdttcnkh: string) : Observable<any> {
    return this.http.post(Const.Spkh00201Ant100Phathanhlai, {sohdttcnkh: sohdttcnkh}, {needSuccessInfo: false})
  }
  huyphathanh(sohdttcnkh: string) : Observable<number> {
    return this.http.post(Const.Spkh00201Ant100Huyphathanh, {sohdttcnkh: sohdttcnkh}, {needSuccessInfo: false})
  }
}
