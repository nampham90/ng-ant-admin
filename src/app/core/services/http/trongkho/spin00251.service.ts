import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import * as Const from 'src/app/common/const';

import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Spin00251Service {

  constructor(
    private http: BaseHttpService
  ) { }

  
  register(params:any): Observable<any> {
    return this.http.post(Const.Spin00251Ant100Register, params,{ needSuccessInfo: false});
  }

  update(params:any): Observable<any> {
    return this.http.post(Const.Spin00251Ant100Update, params,{ needSuccessInfo: false});
  }

  getPHN(params:any): Observable<any> {
    return this.http.post(Const.Spin00251Ant100GetPNH, params,{ needSuccessInfo: false});
  }
}
