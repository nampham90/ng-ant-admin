import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Const from '@app/common/const'
import { ValidatorsService } from '@app/core/services/validators/validators.service';
import { fnCheckForm } from '@app/utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-subwindowctchuyenngoai',
  templateUrl: './subwindowctchuyenngoai.component.html',
  styleUrls: ['./subwindowctchuyenngoai.component.less']
})
export class SubwindowctchuyenngoaiComponent implements OnInit {

  addEditForm!: FormGroup;
  params: any;
  const = Const;

  tiencuocMode = 0;
  tiencuocxengoaiMode = 0;
  editForm = false;
  changeTiencuoc($event: any) {this.tiencuocMode = $event; }
  changeTiencuocxengoai($event: any) {this.tiencuocxengoaiMode = $event; }
  constructor(
    private modalRef: NzModalRef, 
    private fb: FormBuilder,
    private cdf : ChangeDetectorRef,
    private validatorsService: ValidatorsService,
  ) {
    
  }
  protected getAsyncFnData(modalValue: NzSafeAny): Observable<NzSafeAny> {
    return of(modalValue);
  }

  protected getCurrentValue(): Observable<NzSafeAny> {
    if (!fnCheckForm(this.addEditForm)) {
      return of(false);
    }
    this.addEditForm.value['tiencuoc'] = this.tiencuocMode;
    this.addEditForm.value['tiencuocxengoai'] = this.tiencuocxengoaiMode;
    return of(this.addEditForm.value);
  }
  
  ngOnInit(): void {
    
    this.initForm();
    if (Object.keys(this.params).length > 0) {
      this.editForm = true;
      this.setFormStatusByType("enable");
      this.addEditForm.patchValue(this.params);
      this.tiencuocMode = this.params.tiencuoc;
      this.tiencuocxengoaiMode = this.params.tiencuocxengoai;
      console.log(this.params);
    }
  }

  initForm(): void {
    this.addEditForm = this.fb.group({
      stt: [null],
      thongtindonhang: [null, [Validators.required]],
      diadiembochang: [null, [Validators.required]],
      htttxengoai: ["1", [Validators.required]],
      htttkhachhang: ["1",[Validators.required]],
      tennguoinhan:[null,[Validators.required]],
      sdtnguoinhan:[null, [Validators.required,this.validatorsService.mobileValidator()]],
      diachinguoinhan: [null,[Validators.required]],
      ghichu: [null]
    });
  }

  setFormStatusByType(methodName: 'disable' | 'enable') {
    this.addEditForm.get('stt')?.[methodName]();
  }

}
