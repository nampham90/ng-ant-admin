import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as Const from '@app/common/const';
import { ValidationFormService } from '@app/core/services/common/message-errors.service';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import { CommonService } from '@app/core/services/http/common/common.service';
import { Spin00901Service } from '@app/core/services/http/trongkho/spin00901.service';
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
  makho: string;
  makhachhang: string;
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
  dataResponse: string[] = []
  checkedCashArray: any[] = [];
  messageErrors: any = [];
  searchParam: Partial<SearchParam> = {};

  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('tenkhachhangTpl', { static: true }) tenkhachhangTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('availableFlag', { static: true }) availableFlag!: TemplateRef<NzSafeAny>;
  @ViewChild('tiencuocTpl', { static: true }) tiencuocTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('htttTpl', { static: true }) htttTpl!: TemplateRef<NzSafeAny>;

  constHttt = Const.Hinhthucthanhtoan;

  lstsoID: any;

  listKho = [];
  
  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private webService: WebserviceService,
    public vf: ValidationFormService,
    public message: NzMessageService,
    private cdr: ChangeDetectorRef,
    private modalRef: NzModalRef,
    private commonService: CommonService,
    private spin00901Service: Spin00901Service,

  ) { }

  ngOnInit(): void {
    let obj = this.obj(this.params);
    this.initTable();
    this.getListKho();

    if(obj['listsoId'] && obj['listsoId'].length > 0) {
        // ẩn mây những dòng sodi đã gửi lên
        this.lstsoID = obj['listsoId'];
    }
  }

  // xuât nhiều don hàng
  xuatnhieudon() {
    if(this.checkedCashArray.length == 0) {
      this.message.info("Vùi lòng chọn ít nhất một đơn hàng");
    } else {
      this.dataResponse = [];
      for(let element of this.checkedCashArray) {
        this.dataResponse.push(element['soID']);
      }
      this.modalRef.destroy({ status: ModalBtnStatus.Ok, modalValue:this.dataResponse });
    }
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

  // xuat 1 đơn hàng
  getItem(soID:string) {
    this.dataResponse.push(soID);
    this.modalRef.destroy({ status: ModalBtnStatus.Ok, modalValue:this.dataResponse });
  }

  getListKho() {
    const params: SearchCommonVO<any> = {
      pageSize: 0,
      pageNum: 0,
      filters: {
        "rcdkbn": "0001"
      }
    };
    this.spin00901Service
      .searchParams(params)
      .pipe(
        finalize(() => {
        })
      )
      .subscribe(res => {
        this.listKho = res;
        this.cdr.markForCheck();
      });
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
      this.checkedCashArray = [...this.checkedCashArray];
      if(this.lstsoID.length > 0) {
        for (let i = 0; i < this.dataList.length; i++) {
          if (this.lstsoID.includes(this.dataList[i].soID)) {
            this.dataList[i].disable = true;
          } else {
            this.dataList[i].disable = false;
          }
        }
      }
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

  selectedChecked(e: any[]): void {
    this.checkedCashArray = [...e];
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
      showCheckbox: true,
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
          title: "Tên hàng",
          width: 280,
          field: 'tenhang'
        },
        {
          title: "Tiền cước",
          width: 120,
          field: 'tiencuoc',
          tdTemplate: this.tiencuocTpl
        },
        {
          title: "Ngày nhập",
          width: 150,
          field: 'ngaynhapthucte',
          pipe: 'date: dd/MM/YYYY HH:mm'
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
          title: "Tên hàng",
          width: 150,
          field: 'tenhang',
        },
        {
          title: "Số lượng",
          width: 80,
          field: 'soluong',
        },
        {
          title: "Trọng lượng",
          width: 80,
          field: 'trongluong',
        },
        {
          title: "Khối lượng",
          width: 80,
          field: 'khoiluong',
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
