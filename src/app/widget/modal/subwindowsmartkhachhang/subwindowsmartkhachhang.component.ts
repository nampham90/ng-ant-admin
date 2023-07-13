import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '@app/core/services/validators/validators.service';
import { fnCheckForm } from '@app/utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-subwindowsmartkhachhang',
  templateUrl: './subwindowsmartkhachhang.component.html',
  styleUrls: ['./subwindowsmartkhachhang.component.less']
})
export class SubwindowsmartkhachhangComponent implements OnInit {

  addForm!: FormGroup;

  constructor(
    private modalRef: NzModalRef, 
    private fb: FormBuilder,
    private cdf : ChangeDetectorRef,
    private validatorsService: ValidatorsService,
  ) { }

  initForm(): void {
    this.addForm = this.fb.group({
      makhachhang: [null, [Validators.required]],
      name: [null, [Validators.required]],
      dienthoai: [null, [this.validatorsService.mobileValidator()]]
    })
  }

  ngOnInit(): void {
    this.initForm();
  }

  protected getAsyncFnData(modalValue: NzSafeAny): Observable<NzSafeAny> {
    return of(modalValue);
  }

  protected getCurrentValue(): Observable<NzSafeAny> {
    if (!fnCheckForm(this.addForm)) {
      return of(false);
    }
    return of(this.addForm.value);
  }

}
