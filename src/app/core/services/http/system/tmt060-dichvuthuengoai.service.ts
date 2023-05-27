import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import * as Const from "src/app/common/const"
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Tmt060DichvuthuengoaiService {

  constructor(
    public http: BaseHttpService
  ) { }

  getAll(params:any): Observable<any> {
    return this.http.post(Const.Tmt060Ant100getAll, params,{ needSuccessInfo: false});
  }
  add(params:any): Observable<any> {
    return this.http.post(Const.Tmt060Ant100add, params,{ needSuccessInfo: false});
  }
  delete(params:any): Observable<any> {
    return this.http.post(Const.Tmt060Ant100delete, params,{ needSuccessInfo: false});
  }
  update(params:any): Observable<any> {
    return this.http.post(Const.Tmt060Ant100update, params,{ needSuccessInfo: false});
  }
}
