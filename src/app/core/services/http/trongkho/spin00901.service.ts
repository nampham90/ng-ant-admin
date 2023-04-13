import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import * as Const from 'src/app/common/const';
import { Spin00901Model } from '@core/model/trongkho/spin00901.model'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Spin00901Service {

  constructor(
    private http: BaseHttpService
  ) { }

  searchParams(params:any):  Observable<any> {
    return this.http.post(Const.Spin00901Ant100Search, params,{ needSuccessInfo: false});
  }

  Detail(params:any):  Observable<any> {
    return this.http.post(Const.Spin00901Ant100Detail, params,{ needSuccessInfo: false});
  }

  create(params:any): Observable<any> {
    return this.http.post(Const.Spin00901Ant100Add, params,{ needSuccessInfo: false});
  }

  update(params:any): Observable<any> {
    return this.http.post(Const.Spin00901Ant100Update, params,{ needSuccessInfo: false});
  }

  delete(params:any): Observable<any> {
    return this.http.post(Const.Spin00901Ant100Del, params,{ needSuccessInfo: false});
  }

  deleteAll(params:any): Observable<any> {
    return this.http.post(Const.Spin00901Ant100Alldel, params,{ needSuccessInfo: false});
  }

}
