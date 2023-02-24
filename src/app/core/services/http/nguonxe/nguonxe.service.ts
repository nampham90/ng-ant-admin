import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import * as Const from 'src/app/common/const';
import { Nguonxe } from '@core/model/nguonxe.model'
import { Observable } from 'rxjs';
import { PageInfo } from '../../types';
@Injectable({
  providedIn: 'root'
})
export class NguonxeService {

  constructor(
    private http: BaseHttpService
  ) { }

  postAll(params: any) : Observable<PageInfo<Nguonxe>> {
    return this.http.post(Const.NguonxeAnt100GetAll, params,{ needSuccessInfo: false});
  }

  postDetail(params: any) : Observable<Nguonxe> {
    return this.http.post(Const.NguonxeAnt100GetDetail, params,{ needSuccessInfo: false});
  }

  postCreate(params: any) : Observable<Nguonxe> {
    return this.http.post(Const.NguonxeAnt100Create, params,{ needSuccessInfo: false});
  }

  postUpdate(params: any) : Observable<Nguonxe> {
    return this.http.post(Const.NguonxeAnt100Update, params,{ needSuccessInfo: false});
  }

  postDelete(params: any) : Observable<any> {
    return this.http.post(Const.NguonxeAnt100Delete, params,{ needSuccessInfo: false});
  }

  postDeleteAll(params: any) : Observable<any> {
    return this.http.post(Const.NguonxeAnt100DeleteAll, params,{ needSuccessInfo: false});
  }

  postUpdateStatus(params: any) : Observable<Nguonxe> {
    return this.http.post(Const.NguonxeAnt100UpdateStatus, params,{ needSuccessInfo: false});
  }
}
