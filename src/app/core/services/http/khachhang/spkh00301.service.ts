import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import * as Const from 'src/app/common/const';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Spkh00301Service {

  constructor(
    private http: BaseHttpService
  ) { }

  search(params:any): Observable<any> {
    return this.http.post(Const.Spkh00301Ant100Search, params,{ needSuccessInfo: false});
  }
}
