import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Spin00901Service } from '@app/core/services/http/trongkho/spin00901.service';
import { SearchCommonVO } from '@app/core/services/types';
import { fnCheckForm } from '@app/utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Observable, of } from 'rxjs';
import * as Const from "src/app/common/const";

interface Dichvu {
  id?:string;
  rcdkbn: string;
  datacd: string;
}


@Component({
  selector: 'app-spcm01103-modal',
  templateUrl: './spcm01103-modal.component.html',
  styleUrls: ['./spcm01103-modal.component.less']
})
export class Spcm01103ModalComponent implements OnInit {

  addEditForm!: FormGroup;
  params!: object;
  listdichvu: Dichvu[] = []; 
  dichvu!:Dichvu;

  searchParam: Partial<Dichvu> = {};

  constructor(
    private modalRef: NzModalRef,
    private fb: FormBuilder,
    private spin00901Service: Spin00901Service,
  ) { }

  ngOnInit(): void {
    this.initForm();
    if (Object.keys(this.params).length > 0) {
      this.addEditForm.patchValue(this.params);
    }
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
      tennhacungcap: [null, [Validators.required]],
      diachi: [null],
      sodienthoai: [null,[Validators.required]]
    });
  }

}
