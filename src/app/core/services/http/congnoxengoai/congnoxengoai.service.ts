import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import * as Const from 'src/app/common/const';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CongnoxengoaiService {

  constructor(
    private http: BaseHttpService,
  ) { }

  postAll(params: any) : Observable<any> {
    return this.http.post(Const.CongnoxengoaiAnt100GetAll, params,{ needSuccessInfo: false});
  }
}
