import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Const from '@app/common/const';
import { AccountService } from '@app/core/services/http/system/account.service';
import { Spin00901Service } from '@app/core/services/http/trongkho/spin00901.service';
import { SearchCommonVO } from '@app/core/services/types';
import { fnCheckForm } from '@app/utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { finalize, Observable, of } from 'rxjs';
interface Donvitinh{
  value: string;
  lable: string;
}
@Component({
  selector: 'app-subwindowproduct',
  templateUrl: './subwindowproduct.component.html',
  styleUrls: ['./subwindowproduct.component.less']
})
export class SubwindowproductComponent implements OnInit {

  addEditForm!: FormGroup;
  params: object;
  isEdit = false;
  const = Const;
  listKh : any[] = [];
  tenkhachhang = ""
  listdonvitinh :Donvitinh[] = [];
  constructor(
    private modalRef: NzModalRef, 
    private fb: FormBuilder,
    private cdf : ChangeDetectorRef,
    private dataKhachhangService: AccountService,
    private spin00901Service: Spin00901Service
  ) {
    this.params = {}
  }

  ngOnInit(): void {
    this.getListKh();
    this. getListDonvitinh();
    this.initForm();
    if (Object.keys(this.params).length > 0) {
      this.isEdit = true;
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
    this.addEditForm.value['tenkhachhang'] = this.tenkhachhang;
    return of(this.addEditForm.value);
  }

  initForm(): void {
    this.addEditForm = this.fb.group({
      id : [null],
      iduser: [null, [Validators.required]],
      tenhang: [null,[Validators.required]],
      tiencuoc: [0,[Validators.required]],
      soluong: [null,[Validators.required]],
      trongluong: [null],
      khoiluong: [null],
      donvitinh: [null,[Validators.required]],
      diadiembochang:[null,[Validators.required]],
      hinhthucthanhtoan:["1",[Validators.required]],
      lotrinh: ["0",[Validators.required]],
      tennguoinhan: [null,[Validators.required]],
      sdtnguoinhan: [null,[Validators.required]],
      diachinguoinhan: [null,[Validators.required]],
      ghichu: [null],
    });
  }

  changeKH($event: any) {
    for(let e of this.listKh) {
      if(e['id'] == $event) {
         this.tenkhachhang = e['name'];
         break;
      }
    }
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
}
