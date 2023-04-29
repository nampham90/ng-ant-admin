import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '@app/core/services/validators/validators.service';
import { fnCheckForm } from '@app/utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-spin00901sub',
  templateUrl: './spin00901sub.component.html',
  styleUrls: ['./spin00901sub.component.less']
})
export class Spin00901subComponent implements OnInit {

  addEditForm!: FormGroup;
  params!: any;
  constructor(
    private modalRef: NzModalRef,
    private fb: FormBuilder,
    private cdf : ChangeDetectorRef,
    private validatorsService: ValidatorsService,
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

  get f():{ [key: string]: AbstractControl } {
    return this.addEditForm.controls;
  }


  initForm(): void {
    this.addEditForm = this.fb.group({
      datacd: [null, [Validators.required]],
      datanm: [null, [Validators.required]],
      datarnm: [null,[Validators.required]]
    });
  }


}
