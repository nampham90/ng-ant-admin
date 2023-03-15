import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UrlDisplayId } from '@app/common/UrlDisplay';
import { TabService } from '@app/core/services/common/tab.service';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import { BaseComponent } from '@app/pages/system/base/base.component';
import * as Const from "src/app/common/const";
import { ActionCode } from '@app/config/actionCode';
import { OptionsInterface, SearchCommonVO } from '@app/core/services/types';
import { MyTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SubwindowsearchnguonxeService } from '@app/widget/modal/subwindowsearchnguonxe/subwindowsearchnguonxe.service';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Congnonguonxe } from '@app/core/model/congnonguonxe.model';
import { CongnoxengoaiService } from '@app/core/services/http/congnoxengoai/congnoxengoai.service';
import { finalize } from 'rxjs';
import { ModalBtnStatus } from '@app/widget/base-modal';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

interface SearchParam {
  ngaybatdau: string | null;
  ngayketthuc: string | null;
  nguonxe : string;
  status01: number;
}
@Component({
  selector: 'app-spch00254',
  templateUrl: './spch00254.component.html',
  styleUrls: ['./spch00254.component.less']
})
export class Spch00254Component extends BaseComponent implements OnInit {
  override fnInit() {
    
  }
  override destroy() {
    
  }
  override DisplayScreenID: UrlDisplayId = UrlDisplayId.spch00254;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Công nợ xe ngoài',
    breadcrumb: ["Home","Chuyến","Công nợ xe ngoài"],
    desc: ''
  };
  constructor(
    protected override webService: WebserviceService,
    protected override router: Router,
    protected override cdf :  ChangeDetectorRef,
    protected override  datePipe : DatePipe,
    protected override tabService: TabService,
    private dataService : CongnoxengoaiService,
    public message: NzMessageService,
    private modalSrv: NzModalService,
    private modalNguonXeService: SubwindowsearchnguonxeService
  ) {
    super(webService,router,cdf,datePipe,tabService);
   }

  searchParam: Partial<SearchParam> = {};
  dateFormat = Const.dateFormat;
  tableConfig!: MyTableConfig;
  dataList: any[] = [];
  checkedCashArray: any[] = [];
  ActionCode = ActionCode;
  availableOptions: OptionsInterface[] = [];

  ngaybatdau: string | null = null;
  ngayketthuc: string | null = null;
  @ViewChild('endSoplnDate') endSoplnDate!: NzDatePickerComponent;
  disabledStartSoplnDate = (startValue: Date): boolean => {
    if (!startValue || !this.ngayketthuc) {
      return false;
    }
    const date = new Date(this.ngayketthuc)
    return startValue.getTime() > date.getTime();
  };
  disabledEndSoplnDate = (endValue: Date): boolean => {
    if (!endValue || !this.ngaybatdau) {
      return false;
    }
    const date = new Date(this.ngaybatdau)
    return endValue.getTime() <= date.getTime();
  };
  handleStartOpenSoplnChange(open: boolean): void {
    if (!open) {
      this.endSoplnDate.open();
    }
  }
  handleEndOpenSoplnChange(open: boolean): void {}

  nguonxenm = "";
  stocknx = "";

  // tong cuoc
  tongcuoc = 0;
  donvivanchuyen = "";

  @ViewChild('nguonxeTpl', { static: true }) nguonxeTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('donhangTpl', { static: true }) donhangTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('sotiennoTpl', { static: true }) sotiennoTpl!: TemplateRef<NzSafeAny>;

  override ngOnInit(): void {
    this.searchParam.status01 = 0;
    this.initTable();
  }
  // show moda search nguon xe
  searchNguonXeClick() {
    this.modalNguonXeService.show({nzTitle: 'Danh Sách Nguồn Xe'}, {showcomfirm:false}).subscribe(
      res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        const param = { ...res.modalValue };
        this.searchParam.nguonxe=param['id'];
        this.stocknx = param['id'];
        this.nguonxenm = param['datacd'];
      },
    )
  }

  fnFocusOutNguonxe() {
    if(this.searchParam.nguonxe != this.stocknx) {
      this.nguonxenm = "";
    }
  }

  getDataList(e?: NzTableQueryParams) {
    this.tableLoading(true);
    this.searchParam.ngaybatdau = this.formatDate(this.ngaybatdau);
    this.searchParam.ngayketthuc = this.formatDate(this.ngayketthuc);
    const params: SearchCommonVO<any> = {
      pageSize: this.tableConfig.pageSize!,
      pageNum: e?.pageIndex || this.tableConfig.pageIndex!,
      filters: this.searchParam
    };
    this.dataService.postAll(params)
    .pipe(
      finalize(() => {
        this.tableLoading(false);
      })
    )
    .subscribe(data => {
      const { list, total, pageNum } = data;
      this.dataList = [...list];
      if(this.dataList.length == 0) {
        this.modalSrv.info({ nzContent: 'Không Có dữ liệu',});
      }
      this.tableConfig.total = total!;
      this.tableConfig.pageIndex = pageNum!;
      this.tableLoading(false);
      this.checkedCashArray = [...this.checkedCashArray];
    })
  }

  reloadTable(): void {
    this.message.info('Đã được làm mới');
    this.getDataList();
  }

  tableChangeDectction(): void {
    this.dataList = [...this.dataList];
    this.cdf.detectChanges();
  }

  tableLoading(isLoading: boolean): void {
    this.tableConfig.loading = isLoading;
    this.tableChangeDectction();
  }

  
  selectedChecked(e: Congnonguonxe[]): void {
    this.checkedCashArray = [...e];
  }

  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
  }

  resetForm() {
    this.searchParam = {};
    this.searchParam.status01 = 0
    this.nguonxenm = "";
    this.getDataList();
  }

  thanhtoan() {

  }

  xuatpdf() {

  }

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: true,
      headers: [
        {
          title: 'Mã hóa đơn',
          field: 'iddonhang',
          width: 250,
          tdTemplate: this.donhangTpl
        },
        {
          title: 'Nguồn Xe',
          width: 300,
          field: 'nguonxe',
          tdTemplate: this.nguonxeTpl
        },
        {
          title: 'Ngày phát hành',
          width: 250,
          field: 'ngaynhap',
          pipe: "date: dd/MM/YYYY HH:mm"
        },
        {
          title: 'Biển số xe',
          width: 200,
          field: 'biensoxe',
        },
        {
          title: 'Tên tài xe',
          width: 200,
          field: 'tentaixe',
        },
        {
          title: 'SDT Tài xế',
          width: 200,
          field: 'sodienthoai',
        },
        {
          title: 'Số tiền ',
          width: 200,
          field: 'sotienno',
          tdTemplate: this.sotiennoTpl
        },
        {
          title: 'Ghi chú',
          width: 450,
          field: 'ghichu',
          tdTemplate: this.operationTpl
        }
      ],
      total: 0,
      loading: true,
      pageSize: 10,
      pageIndex: 1
    };
  }
  // data exprot pdf
  generateData() {

  }

  // xuất file pdf gửi cho nguồn xe
  exportPDF() {

  }
}
