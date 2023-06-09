import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, FormGroupDirective } from '@angular/forms';
import * as Const from '@app/common/const';
import { NguonxeService } from '@app/core/services/http/nguonxe/nguonxe.service';

import { Spin00901Service } from '@app/core/services/http/trongkho/spin00901.service';
import { SearchCommonVO } from '@app/core/services/types';
import { fnCheckForm } from '@app/utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Observable, finalize, of } from 'rxjs';
import { Nguonxe } from '@core/model/nguonxe.model'
import { CommonService } from '@app/core/services/http/common/common.service';
import { Dichvuthuengoai } from '@app/core/model/tmt060_dichvuthuengoai.model';
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

  isCollapse = true;
  isCollapsenhaphang = true;
  isCollapsetrahang = true;

  listnguonxe : any = [];
  listxecau: Dichvuthuengoai[] = [];
  listbocxep: Dichvuthuengoai[] = [];

  listbsxe = [];
  listtaixe = [];

  searchParam: Partial<SearchParam> = {};
  constructor(
    private modalRef: NzModalRef, 
    private fb: FormBuilder,
    private cdf : ChangeDetectorRef,
    private spin00901Service: Spin00901Service,
    private nguonxeService: NguonxeService,
    private commonService: CommonService
  ) { 
    this.params = {}
  }

  ngOnInit(): void {
    this.initForm();
    this.getListKho();
    this.getListDonvitinh();
    this.fnGetAllNguonXe();
    this.getListBocXep();
    this.getListXeCau();
    if (Object.keys(this.params).length > 0) {
      this.isEdit = true;
      this.setFormStatusByType("enable");
      let json_param = JSON.parse(JSON.stringify(this.params));
      this.getlistTangbonhaphang({id:json_param['nguonxenhaphang']});
      this.getlistTangbotrahang({id:json_param['nguonxetrahang']});
      this.addEditForm.patchValue(this.params);
      this.isCollapse = false;
      this.isCollapsenhaphang = false;
      this.isCollapsetrahang = false;
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

      nguonxenhaphang: [null],
      sotiennhaphang: [0],
      htttnhaphang: [1],
      tentaixenhaphang: [null],
      biensoxenhaphang: [null],

      nguonxetrahang: [null],
      sotientrahang: [0],
      httttrahang: [1],
      tentaixetrahang: [null],
      biensoxetrahang: [null],

      xecau: [null],
      sotienxecau: [0],
      htttxecau: [1],

      bocxep: [null],
      sotienbocxep: [0],
      htttbocxep: [1],

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

  fnGetAllNguonXe() {
    let req = {
      pageSize: 0,
      pageNum: 0
    }
    this.nguonxeService.postAll(req).pipe().subscribe(res => {
        this.listnguonxe = res;
    })
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

  changeTangbonhaphang($event:any) {
    if($event != null) {
      this.isCollapsenhaphang = false;
      this.addEditForm.patchValue({
        tentaixenhaphang: null,
        biensoxenhaphang: null,
        sotiennhaphang:0
      })
      let req = {
        id : $event
      }
      this.getlistTangbonhaphang(req);

    } else {
      this.isCollapsenhaphang = true;
    }
  }

  getlistTangbonhaphang(req: any) {
    this.nguonxeService.postDetail(req).pipe().subscribe(res => {
      this.fnGetListBiensoxe(res.id);
      this.fnGetListTaiXe(res.sodienthoai);
    })
  }

  changeTangbotrahang($event:any) {
    if($event != null) {
      this.isCollapsetrahang = false;
      this.addEditForm.patchValue({
        tentaixetrahang: null,
        biensoxetrahang: null,
        sotientrahang: 0
      })
      let req = {
        id : $event
      }
      this.getlistTangbotrahang(req);
    } else {
      this.isCollapsetrahang = true;
    }
  }

  changeDichvuxecau($event: any) {
    this.addEditForm.patchValue({
      sotienxecau: 0
    })
  }

  changeDichvubocxep($event: any) {
    this.addEditForm.patchValue({
      sotienbocxep: 0
    })
  }

  getlistTangbotrahang(req: any) {
    this.nguonxeService.postDetail(req).pipe().subscribe(res => {
      this.fnGetListBiensoxe(res.id);
      this.fnGetListTaiXe(res.sodienthoai);
    })
  }

  getListXeCau() {
    this.commonService.getListDichvuxecau().subscribe(res=> {
      this.listxecau = res;
    })
  }

  getListBocXep() {
    this.commonService.getListDichvubocxep().subscribe(res => {
      this.listbocxep = res;
    })

  }

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
  }

  // get list biên sô xe vơi rcdkbn là id của nguồn xe
  fnGetListBiensoxe(rcdkbn: any) {
    const params: SearchCommonVO<any> = {
      pageSize: 0,
      pageNum: 0,
      filters: {rcdkbn: rcdkbn}
    };
    this.spin00901Service
    .searchParams(params)
    .pipe(
      finalize(() => {
      })
    )
    .subscribe(res => {
      this.listbsxe = res;
      this.cdf.detectChanges()
    });
  }

  // get list tài xe se ngoài vơi rcdkbn là so điện thoài nguồn xe
  fnGetListTaiXe(rcdkbn: any) {
    const params: SearchCommonVO<any> = {
      pageSize: 0,
      pageNum: 0,
      filters: {rcdkbn: rcdkbn}
    };
    this.spin00901Service
    .searchParams(params)
    .pipe(
      finalize(() => {
      })
    )
    .subscribe(res => {
      this.listtaixe = res;
      this.cdf.detectChanges()
    });
  }

}
