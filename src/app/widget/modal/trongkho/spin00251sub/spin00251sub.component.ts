import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, FormGroupDirective } from '@angular/forms';
import * as Const from '@app/common/const';

import { Spin00901Service } from '@app/core/services/http/trongkho/spin00901.service';
import { SearchCommonVO } from '@app/core/services/types';
import { fnCheckForm } from '@app/utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Observable, finalize, of } from 'rxjs';

interface Donvitinh{
  value: string;
  lable: string;
}

interface SearchParam {
  rcdkbn: string;
}
@Component({
  selector: 'app-spin00251sub',
  templateUrl: './spin00251sub.component.html',
  styleUrls: ['./spin00251sub.component.less']
})
export class Spin00251subComponent implements OnInit {
  addEditForm!: FormGroup;
  params: object;
  isEdit = false;
  const = Const;
  listKho: any[] = [];
  listdonvitinh :Donvitinh[] = [];
  tenkho = "";

  searchParam: Partial<SearchParam> = {};
  constructor(
    private modalRef: NzModalRef, 
    private fb: FormBuilder,
    private cdf : ChangeDetectorRef,
    private spin00901Service: Spin00901Service,
  ) { 
    this.params = {}
  }

  ngOnInit(): void {
    this.initForm();
    this.getListKho();
    this.getListDonvitinh();
    if (Object.keys(this.params).length > 0) {
      this.isEdit = true;
      this.setFormStatusByType("enable");
      this.addEditForm.patchValue(this.params);
    }
  }

  setFormStatusByType(methodName: 'disable' | 'enable') {
    this.addEditForm.get('stt')?.[methodName]();
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


  initForm(): void {
    this.addEditForm = this.fb.group({
      stt: [null],
      noidungdonhang: [null,[Validators.required]],
      tiencuoc: [0,[Validators.required]],
      diadiembochang:[null,[Validators.required]],
      soluong: [null,[Validators.required]],
      trongluong: [null],
      khoiluong: [null],
      donvitinh: [null,[Validators.required]],
      makho: [null,[Validators.required]],
      tennguoinhan: [null,[Validators.required]],
      sdtnguoinhan: [null,[Validators.required]],
      diachinguoinhan: [null,[Validators.required]],
      ghichu: [null],
    });
  }

  getListKho() {
    this.searchParam.rcdkbn = "0001";
    const params: SearchCommonVO<any> = {
      pageSize: 0,
      pageNum: 0,
      filters: this.searchParam
    };
    this.spin00901Service
      .searchParams(params)
      .pipe(
        finalize(() => {
        })
      )
      .subscribe(res => {
        this.listKho = res;
        this.cdf.markForCheck();
      });
  }

  getListDonvitinh() {
    const params: SearchCommonVO<any> = {
      pageSize: 0,
      pageNum: 0,
      filters: {
        rcdkbn : this.const.tmt050lstdonvitinh
      }
    };
    this.spin00901Service.searchParams(params).subscribe(res=> {
       this.fnAddlstDonvitinh(res);
    })
  }

  fnAddlstDonvitinh(lstdatacd: any) {
    for(let element of lstdatacd) {
        let donvitinh:Donvitinh = {
          value: element['datacd'],
          lable: element['datanm'],
        }
        this.listdonvitinh.push(donvitinh);
    } 
  }

  changeKho($event: any) {
    let check = false;
    if($event == 'KHONGOAI') {
      this.addEditForm.patchValue({
        diadiembochang: ""
      })
    } else {
      this.addEditForm.patchValue({
        diadiembochang: $event
      })
    }
    
    for(let e of this.listKho) {
      // kho = KHONGOAI
      if(e['datacd'] == $event) {
         this.tenkho = e['datanm'];
         check = true;
         break;
      }
      // if 
    }
  }

}
