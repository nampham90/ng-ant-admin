import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseHttpService } from '../base-http.service';
import * as Const from 'src/app/common/const';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CtchuyenngoaiService {

  constructor(
    private http: BaseHttpService,
    private router: Router
  ) { }

  postAll(params: any) : Observable<any> {
    return this.http.post(Const.ChitietchuyenngoaiAnt100GetAll, params,{ needSuccessInfo: false});
  }

  postUpdateListId(params: any) : Observable<any> {
    return this.http.post(Const.ChitietchuyenngoaiAnt100PostlistId, params,{ needSuccessInfo: false});
  }
  
}
