import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../base-http.service';
import * as Const from 'src/app/common/const';
@Injectable({
  providedIn: 'root'
})
export class ChuyenngoaiService {

  constructor(
    private http: BaseHttpService
  ) { }

  postCreate(params: any) : Observable<any> {
    return this.http.post(Const.chuyenngoaiAnt100Create, params,{ needSuccessInfo: false});
  }

  postallChuyenngoai(params: any) : Observable<any> {
    return this.http.post(Const.chuyenngoaiAnt100GetAll, params,{ needSuccessInfo: false});
  }

}
