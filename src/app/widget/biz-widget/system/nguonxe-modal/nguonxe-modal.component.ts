import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fnCheckForm } from '@app/utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-nguonxe-modal',
  templateUrl: './nguonxe-modal.component.html',
  styleUrls: ['./nguonxe-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NguonxeModalComponent implements OnInit {

  addEditForm!: FormGroup;

  params: object;
  constructor(
    private modalRef: NzModalRef, private fb: FormBuilder
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
      this.addEditForm.patchValue(this.params);
    }
  }

  initForm(): void {
    this.addEditForm = this.fb.group({
      datacd: [null, [Validators.required]],
      datanm: [null, [Validators.required]],
      sodienthoai: [null,[Validators.required]],
      diachi: [null],
      thongtinthanhtoan1: [null],
      thongtinthanhtoan2: [null]
    });
  }

}
