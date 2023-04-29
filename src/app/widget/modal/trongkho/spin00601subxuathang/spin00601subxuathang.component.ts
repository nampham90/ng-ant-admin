import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Const from '@app/common/const';
import { ChuyenService } from '@app/core/services/http/chuyen/chuyen.service';
import { fnCheckForm } from '@app/utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-spin00601subxuathang',
  templateUrl: './spin00601subxuathang.component.html',
  styleUrls: ['./spin00601subxuathang.component.less']
})
export class Spin00601subxuathangComponent implements OnInit {

  addEditForm!: FormGroup;
  params: any;
  isEdit = false;
  const = Const;
  listChuyen: any[] = [];
  constructor(
    private modalRef: NzModalRef, 
    private fb: FormBuilder,
    private cdf : ChangeDetectorRef,
    private chuyenService: ChuyenService,
  ) {
    this.params = {}
   }

  protected getAsyncFnData(modalValue: NzSafeAny): Observable<NzSafeAny> {
    return of(modalValue);
  }

  protected getCurrentValue(): Observable<NzSafeAny> {
    if (!fnCheckForm(this.addEditForm)) {
      return of(false);
    }
    return of(this.addEditForm.value);
  }

  ngOnInit(): void {
    this.initForm();
    if (Object.keys(this.params).length > 0) {
        this.listChuyen = this.params['lstchuyen'];
    }
  }

  
  initForm(): void {
    this.addEditForm = this.fb.group({
      soODT: [null,[Validators.required]],
      biensoxe:[null,[Validators.required]],
      id: [null,[Validators.required]],
      lotrinh: ["0",[Validators.required]]
    });
  }

  changeChuyen($event:any) {
    let idchuyen = "";
    let biensoxe = ""
    for(let element of this.listChuyen) {
      if(element['soodt'] == $event) {
        idchuyen = element['id'];
        biensoxe = element['biensoxe']['biensoxe']
      }
    }
    this.addEditForm.patchValue({
      id: idchuyen,
      biensoxe: biensoxe
    })
  }

}
