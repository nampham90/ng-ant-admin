import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Const from '@app/common/const'
import { AccountService } from '@app/core/services/http/system/account.service';
import { SearchCommonVO } from '@app/core/services/types';
import { ValidatorsService } from '@app/core/services/validators/validators.service';
import { fnCheckForm } from '@app/utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { finalize, Observable, of } from 'rxjs';
@Component({
  selector: 'app-subwindowctchuyenngoai',
  templateUrl: './subwindowctchuyenngoai.component.html',
  styleUrls: ['./subwindowctchuyenngoai.component.less']
})
export class SubwindowctchuyenngoaiComponent implements OnInit {

  addEditForm!: FormGroup;
  params: any;
  const = Const;
  listKh : any[] = [];

  listdonvitinh = Const.lstdonvitinh;

  tiencuocMode = 0;
  tiencuocxengoaiMode = 0;
  editForm = false;
  _disable = false;
  changeTiencuoc($event: any) {this.tiencuocMode = $event; }
  changeTiencuocxengoai($event: any) {this.tiencuocxengoaiMode = $event; }
  constructor(
    private modalRef: NzModalRef, 
    private fb: FormBuilder,
    private cdf : ChangeDetectorRef,
    private validatorsService: ValidatorsService,
    private dataKhachhangService: AccountService
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
    this.getListKh();
    this.initForm();
    if (Object.keys(this.params).length > 0) {
      this.editForm = true;
      this.setFormStatusByType("enable");
      this.addEditForm.patchValue(this.params);
      this.tiencuocMode = this.params.tiencuoc;
      if(this.params.soid && this.params.soid != "") {
         this._disable = true;
      }
      this.tiencuocxengoaiMode = this.params.tiencuocxengoai;
    }
  }

  initForm(): void {
    this.addEditForm = this.fb.group({
      stt: [null],
      thongtindonhang: [null, [Validators.required]],
      soluong: [null,[Validators.required]],
      donvitinh: [null,[Validators.required]],
      diadiembochang: [null, [Validators.required]],
      htttxengoai: ["1", [Validators.required]],
      idkhachhang: ["", [Validators.required]],
      htttkhachhang: ["1",[Validators.required]],
      tennguoinhan:[null,[Validators.required]],
      sdtnguoinhan:[null, [Validators.required,this.validatorsService.mobileValidator()]],
      diachinguoinhan: [null,[Validators.required]],
      status02: ["1",[Validators.required]],
      ghichu: [null]
    });
  }

  setFormStatusByType(methodName: 'disable' | 'enable') {
    this.addEditForm.get('stt')?.[methodName]();
  }

  getListKh() {
    const params: SearchCommonVO<any> = {
      pageSize: 0,
      pageNum: 0,
      filters: {
        phongban_id : this.const.idKhachhang
      }
    };
    this.dataKhachhangService
      .getAccount(params)
      .pipe(
        finalize(() => {
        })
      )
      .subscribe(res => {
        this.listKh = res;
        this.cdf.markForCheck();
      });
  }
}
