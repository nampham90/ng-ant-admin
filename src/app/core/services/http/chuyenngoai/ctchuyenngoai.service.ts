import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseHttpService } from '../base-http.service';
import * as Const from 'src/app/common/const';
@Injectable({
  providedIn: 'root'
})
export class CtchuyenngoaiService {

  constructor(
    private http: BaseHttpService,
    private router: Router
  ) { }
}
