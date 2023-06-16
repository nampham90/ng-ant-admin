import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../base-http.service';
import * as Const from "src/app/common/const"
import { Congnodichvuthuengoai } from '@app/core/model/tmt061_congnodichvuthuengoai.model';
import { PageInfo, SearchCommonVO } from '../../types';


export interface SearchParamCNDVTN {
  manhacungcap?: string;
  status01?: number;
}

@Injectable({
  providedIn: 'root'
})
export class Tmt061CongnodichvuthuengoaiService {

  constructor(
    public http: BaseHttpService
  ) { }

  getAll(params:SearchCommonVO<SearchParamCNDVTN>): Observable<PageInfo<Congnodichvuthuengoai>> {
    return this.http.post(Const.Tmt061Ant100getAll, params,{ needSuccessInfo: false});
  }
}
