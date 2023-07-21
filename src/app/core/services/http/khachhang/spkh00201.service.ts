import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../base-http.service';
import * as Const from '@app/common/const'
@Injectable({
  providedIn: 'root'
})
export class Spkh00201Service {

  constructor(
    private http: BaseHttpService,
  ) { }

  getlists(params:any): Observable<any>{
    return this.http.post(Const.Spkh00201Ant100GetAll, params, {needSuccessInfo: false});
  }
}
