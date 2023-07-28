import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { Observable } from 'rxjs';
import * as Const from "src/app/common/const"

@Injectable({
  providedIn: 'root'
})
export class Spch00201Service {

  constructor(
    private http: BaseHttpService,
  ) { }

  updateTiencuocSoID(params: any): Observable<any> {
    return this.http.post(Const.Spch00201Ant100UpdateTiencuocSoID, params,{ needSuccessInfo: false});
  }
  
}
