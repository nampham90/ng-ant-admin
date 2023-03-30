import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DestroyService } from '@app/core/services/common/destory.service';
import { LangService } from '@app/core/services/common/lang.service';
import { ValidationFormService } from '@app/core/services/common/message-errors.service';
import { fnCheckForm } from '@app/utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-huongdan-modal',
  templateUrl: './huongdan-modal.component.html',
  styleUrls: ['./huongdan-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class HuongdanModalComponent implements OnInit {

  addEditForm!: FormGroup;
  params!: any;
  isEdit = false;
  value?: string;
  constructor(
    private modalRef: NzModalRef,
    private fb: FormBuilder,
    public vf: ValidationFormService,
    public message: NzMessageService,
    private langService : LangService,
  ) { }
  protected getAsyncFnData(modalValue: NzSafeAny): Observable<NzSafeAny> {
    return of(modalValue);
  }

  protected getCurrentValue(): Observable<NzSafeAny> {
    if (!fnCheckForm(this.addEditForm)) {
      return of(false);
    }
    return of(this.addEditForm.value);
  }

  get f():{ [key: string]: AbstractControl } {
    return this.addEditForm.controls;
  }
  
  ngOnInit(): void {
    this.initForm();
    if (Object.keys(this.params).length > 0) {
      this.addEditForm.patchValue(this.params);
    }
  }

  initForm(): void {
    this.addEditForm = this.fb.group({
      idyoutube: [null, [Validators.required]],
      urldisplayid: [null, [Validators.required]],
      title: [null],
      content: [null]
    });
  }

}
