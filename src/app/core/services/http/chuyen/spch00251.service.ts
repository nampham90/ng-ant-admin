import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { Observable } from 'rxjs';
import * as Const from "src/app/common/const"
@Injectable({
  providedIn: 'root'
})
export class Spch00251Service {

  constructor(
    private http: BaseHttpService,
  ) { }

  Huychuyenngoai(params: any): Observable<any> {
    return this.http.post(Const.Spch00251Ant100Huychuyenngoai, params,{ needSuccessInfo: false});
  }
  
}
