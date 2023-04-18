import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import * as Const from 'src/app/common/const';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Spin00601Service {

  constructor(
    private http: BaseHttpService
  ) { }

  
  xuathang(params:any): Observable<any> {
    return this.http.post(Const.Spin00601Ant100XuatHang, params,{ needSuccessInfo: false});
  }
  
  xuatnhieudon(params:any): Observable<any> {
    return this.http.post(Const.Spin00601Ant100Xuatnhieudon, params,{ needSuccessInfo: false});
  }
}
