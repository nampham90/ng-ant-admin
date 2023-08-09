import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../base-http.service';
import * as Const from 'src/app/common/const';
import { ParamsCU } from '@app/pages/chuyen/spch00251/spch00251.component';
@Injectable({
  providedIn: 'root'
})
export class ChuyenngoaiService {

  constructor(
    private http: BaseHttpService
  ) { }

  postCreate(params: ParamsCU) : Observable<ParamsCU> {
    return this.http.post(Const.chuyenngoaiAnt100Create, params,{ needSuccessInfo: false});
  }

  postUpdate(params: ParamsCU) : Observable<ParamsCU> {
    return this.http.post(Const.chuyenngoaiAnt100Update, params,{ needSuccessInfo: false});
  }

  postDetail(params: any) : Observable<any> {
    return this.http.post(Const.chuyenngoaiAnt100GetId, params,{ needSuccessInfo: false});
  }

  postExportDetail(params: any) : Observable<any> {
    return this.http.post(Const.chuyenngoaiAnt100ExportDetail, params,{ needSuccessInfo: false});
  }

  postallChuyenngoai(params: any) : Observable<any> {
    return this.http.post(Const.chuyenngoaiAnt100GetAll, params,{ needSuccessInfo: false});
  }

  postUpdateStatus02(params: any) : Observable<any> {
    return this.http.post(Const.chuyenngoaiAnt100UpdateStatus02, params,{ needSuccessInfo: false});
  }


}
