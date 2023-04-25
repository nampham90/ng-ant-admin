import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as Const from '@app/common/const';
import { ValidationFormService } from '@app/core/services/common/message-errors.service';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import { CommonService } from '@app/core/services/http/common/common.service';
import { SearchCommonVO } from '@app/core/services/types';
import { ValidatorsService } from '@app/core/services/validators/validators.service';
import { MyTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { ModalBtnStatus } from '@app/widget/base-modal';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { finalize } from 'rxjs';
interface SearchParam {
  idchuyen: any;
  status02: number;
}
@Component({
  selector: 'app-subcommonsoid',
  templateUrl: './subcommonsoid.component.html',
  styleUrls: ['./subcommonsoid.component.less']
})
export class SubcommonsoidComponent implements OnInit {
  tableConfig!: MyTableConfig;
  dataList: any[] = [];
  params!: Object;
  dataResponse: NzSafeAny = {}
  messageErrors: any = [];
  searchParam: Partial<SearchParam> = {};

  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('tenkhachhangTpl', { static: true }) tenkhachhangTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('availableFlag', { static: true }) availableFlag!: TemplateRef<NzSafeAny>;
  @ViewChild('tiencuocTpl', { static: true }) tiencuocTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('htttTpl', { static: true }) htttTpl!: TemplateRef<NzSafeAny>;

  constHttt = Const.Hinhthucthanhtoan;
  
  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private webService: WebserviceService,
    public vf: ValidationFormService,
    public message: NzMessageService,
    private cdr: ChangeDetectorRef,
    private modalRef: NzModalRef,
    private commonService: CommonService,
    

  ) { }

  ngOnInit(): void {
    let obj = this.obj(this.params);
    if(obj['idchuyen'] && obj['idchuyen'] == "NULL") {
       this.searchParam.idchuyen = null;
    }
    if(obj['status02'] && obj['status02'] == "KHONG") {
       this.searchParam.status02 = 0;
    }

    this.initTable();
  }

  mergeHttt(httt: any) {
    let strHttt = httt + "";
    let htttnm  = "";
    for(let element of this.constHttt) {
       if(element.value === strHttt) {
         htttnm = element.lable;
       }
    }
    return htttnm;
  }

  obj(param:any) {
    let str=JSON.stringify(param);
    let obj = JSON.parse(str);
    return obj;
  }

  getItem(soID:string,iduser:any,tiencuoc:any,noidungdonhang:any,soluong:any,donvitinh:any,diadiembochang:any,hinhthucthanhtoan:any,tennguoinhan:any,sdtnguoinhan:any,diachinguoinhan:any,ghichu:any) {
    this.dataResponse = {
      soID: soID,
      iduser: iduser,
      tiencuoc: tiencuoc,
      noidungdonhang:noidungdonhang,
      soluong: soluong,
      donvitinh:donvitinh,
      diadiembochang:diadiembochang,
      hinhthucthanhtoan:hinhthucthanhtoan,
      tennguoinhan:tennguoinhan,
      sdtnguoinhan:sdtnguoinhan,
      diachinguoinhan:diachinguoinhan,
      ghichu:ghichu
    }
    this.modalRef.destroy({ status: ModalBtnStatus.Ok, modalValue:this.dataResponse });
  }

  getDataList(e?: NzTableQueryParams): void {
    this.tableConfig.loading = true;
    const params: SearchCommonVO<any> = {
      pageSize: this.tableConfig.pageSize!,
      pageNum: e?.pageIndex || this.tableConfig.pageIndex!,
      filters: this.searchParam
    };
    this.commonService.getListSoID(params)
    .pipe(
      finalize(() => {
        this.tableLoading(false);
      })
    )
    .subscribe(data => {
      const { list, total, pageNum } = data;
        this.dataList = [...list];
        this.tableConfig.total = total!;
        this.tableConfig.pageIndex = pageNum!;
        this.tableLoading(false);
    })
  }

  tableChangeDectction(): void {
    this.dataList = [...this.dataList];
    this.cdr.detectChanges();
  }

  tableLoading(isLoading: boolean): void {
    this.tableConfig.loading = isLoading;
    this.tableChangeDectction();
  }

  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
  }

  resetForm(): void {
    this.searchParam = {};
    this.getDataList();
  }

  reloadTable(): void {
    this.message.info('Làm mới thành công');
    this.getDataList();
  }

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: false,
      headers: [
        {
          title: 'Số ID',
          field: 'soID',
          width: 200,
          tdTemplate: this.operationTpl
        },
        {
          title: 'Trạng thái',
          width: 150,
          field: 'trangthai',
          tdTemplate: this.availableFlag
        },
        {
          title: 'Người gửi',
          width: 200,
          field: 'name',
          tdTemplate: this.tenkhachhangTpl
        },
        {
          title: "Tiền cước",
          width: 180,
          field: 'tiencuoc',
          tdTemplate: this.tiencuocTpl
        },
        {
          title: "Ngày nhập",
          width: 120,
          field: 'ngaynhap',
        },
        {
          title: "Kho",
          width: 150,
          field: 'makho',
        },
        {
          title: "Địa điểm bóc hàng",
          width: 150,
          field: 'diadiembochang',
        },
        {
          title: "Nội dung đơn hàng",
          width: 150,
          field: 'noidungdonhang',
        },
        {
          title: "Số lượng",
          width: 150,
          field: 'soluong',
        },
        {
          title: "Đơn vị tính",
          width: 150,
          field: 'donvitinh',
        },
        {
          title: "Hinh thức thanh toán",
          width: 150,
          field: 'hinhthucthanhtoan',
          tdTemplate: this.htttTpl
        },
        {
          title: "Tên người nhận",
          width: 150,
          field: 'tennguoinhan',
        },
        {
          title: "SĐT người nhận",
          width: 150,
          field: 'sdtnguoinhan',
        },
        {
          title: "Địa chỉ người nhận",
          width: 150,
          field: 'diachinguoinhan',
        },
        {
          title: "Ghi chú",
          width: 150,
          field: 'ghichu',
        },
      ],
      total: 0,
      loading: true,
      pageSize: 10,
      pageIndex: 1
    };
  }

}
