import { Injectable } from '@angular/core';
import { BaseHttpService } from '@services/base-http.service';
import * as Const from 'src/app/common/const';
import { User } from '@core/model/user.model'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TaixeService {

  constructor(
    private http: BaseHttpService
  ) { }

  getInitTaiXe(params:any): Observable<any> {
    return this.http.post(Const.TaixeAnt100Init, params, {needSuccessInfo: false});
  }

  updateStatusOrder(params:any):Observable<any> {
    return this.http.post(Const.TaixeAnt100Updatestatusorder, params, {needSuccessInfo: false});
  }
  
}
