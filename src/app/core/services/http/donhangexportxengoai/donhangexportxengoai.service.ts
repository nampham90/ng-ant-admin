import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import * as Const from 'src/app/common/const';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DonhangexportxengoaiService {

  constructor(
    private http: BaseHttpService,
  ) { }

  postCreate(params:any) : Observable<any> {
    return this.http.post(Const.DonhangexportxengoaiAnt100Create, params,{ needSuccessInfo: false});
  }

  postAll(params:any) : Observable<any> {
    return this.http.post(Const.DonhangexportxengoaiAnt100FindAll, params,{ needSuccessInfo: false});
  }
}
