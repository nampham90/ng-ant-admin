import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../base-http.service';
import * as Const from "src/app/common/const"
@Injectable({
  providedIn: 'root'
})
export class Tmt050Service {

  constructor(
    public http: BaseHttpService
  ) { }

  getListKBN(params:any): Observable<any> {
    return this.http.post(Const.Tmt050Ant100GetListKBN, params,{ needSuccessInfo: false});
  }
}
//Tmt050Ant100GetListKBN