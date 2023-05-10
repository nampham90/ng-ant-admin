import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Const from '@app/common/const'
import { Spin00901Service } from '@app/core/services/http/trongkho/spin00901.service';
import { SearchCommonVO } from '@app/core/services/types';
import { MyTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { fnCheckForm } from '@app/utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Observable, of } from 'rxjs';

interface SearchParam {
  rcdkbn: string;
}

interface ChiPhi {
  idchuyen: string;
  tenchiphi: string;
  sotien: number;
  ghichu: string;
}

@Component({
  selector: 'app-subwindowchiphi',
  templateUrl: './subwindowchiphi.component.html',
  styleUrls: ['./subwindowchiphi.component.less'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SubwindowchiphiComponent implements OnInit {
  dataList: any = [];
  tableConfig!: MyTableConfig;
  addEditForm!: FormGroup;
  items!: FormArray;
  data: any = [];
  params!: any;
  const = Const;
  //lstchiphi = Const.lstchiphi;
  lstchiphi: ChiPhi[] = [];
  tongchiphi = 0;
  showInfo = false;

  searchParam: Partial<SearchParam> = {};

  @ViewChild('Tlsotien', { static: true }) Tlsotien!: TemplateRef<any>;
  @ViewChild('Tlghichu', { static: true }) Tlghichu!: TemplateRef<any>;
  @ViewChild('Tfooter', { static: true }) Tfooter!: TemplateRef<any>;
  @ViewChild('Ttilte', { static: true }) Ttilte!: TemplateRef<any>;
  constructor(
    private modalRef: NzModalRef, 
    private fb: FormBuilder,
    private cdf : ChangeDetectorRef,
    private modalSrv: NzModalService,
    private spin00901Service: Spin00901Service,
  ) {
    this.data.push({
      tenchiphi: 'Tên chi phí',
      sotien: 'Số tiền',
      ghichu: 'Ghi chú',
    });
   // this.params = {}

  }

  fnAddlistchiphi(listdatacd: any) {
    for(let element of listdatacd) {
      let chiphi: ChiPhi = {
        idchuyen: "",
        tenchiphi: element['datacd'],
        sotien: 0,
        ghichu: ""
      }
      this.lstchiphi.push(chiphi);
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

  createItem(element: any): FormGroup {
    return this.fb.group({
      tenchiphi: [element.tenchiphi, [Validators.required]],
      sotien: [element.sotien, [Validators.required]],
      ghichu: [element.ghichu],
    });
  }

  getControls() {
    return (this.addEditForm.get('items') as FormArray).controls;
  }

  ngOnInit(): void {
    this.addEditForm = this.fb.group({
      items: this.fb.array([]),
    });

    if(this.params.status != undefined && this.params.status ==5) {
      this.showInfo = true;
    }
    if(this.params.listcp != undefined && this.params.listcp.length > 0) {
       this.lstchiphi = this.params.listcp;
       this.createForm();
       this.cdf.detectChanges();
    } else {
      this.searchParam.rcdkbn = Const.tmt050lstchiphi;
      const params: SearchCommonVO<any> = {
        pageSize: 0,
        pageNum: 0,
        filters: this.searchParam
      };
      this.spin00901Service.searchParams(params).subscribe(res=> {
        this.fnAddlistchiphi(res);
        this.createForm();
        this.cdf.detectChanges();
      })
    }

  }

  createForm() {
    for (let element of this.lstchiphi) {
      this.items = this.addEditForm.get('items') as FormArray;
      this.items.push(this.createItem(element));
    }
    this.fnTinhchiphi();
  }

  fnTongchiphi($event:any) {
    this.fnTinhchiphi();
  }

  fnTinhchiphi() {
    this.tongchiphi = 0;
    for(let element of this.addEditForm.value.items) {
      this.tongchiphi = this.tongchiphi + element.sotien;
    }
  }
}
