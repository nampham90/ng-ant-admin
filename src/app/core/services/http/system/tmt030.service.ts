import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../base-http.service';
import * as Const from "src/app/common/const"
@Injectable({
  providedIn: 'root'
})
export class Tmt030Service {

  SYSFLG1 = 0; // 1. cho phép tài xế thay đổi trạng thai đơn hàng, 0 . không cho phép
  SYSFLG2 = 0;//
  SYSFLG3 = 0; //
  SYSFLG4 = 0; // 
  SYSFLG5 = 0; 
  SYSFLG6 = 0; 
  SYSFLG7 = 0; 
  SYSFLG8 = 0;
  SYSFLG9 = 0;
  SYSFLG10 = 0;

  constructor(
    public http: BaseHttpService
  ) { }

  clear() {
    this.SYSFLG1 = 0; // 1. cho phép tài xế thay đổi trạng thai đơn hàng, 0 . không cho phép
    this.SYSFLG2 = 0;//
    this.SYSFLG3 = 0; //
    this.SYSFLG4 = 0; // 
    this.SYSFLG5 = 0; 
    this.SYSFLG6 = 0; 
    this.SYSFLG7 = 0; 
    this.SYSFLG8 = 0;
    this.SYSFLG9 = 0;
    this.SYSFLG10 = 0;
  }

  getSYSFLG(params:any): Observable<any> {
    return this.http.post(Const.Tmt030Ant100GetSYSFLG, params,{ needSuccessInfo: false});
  }
}
