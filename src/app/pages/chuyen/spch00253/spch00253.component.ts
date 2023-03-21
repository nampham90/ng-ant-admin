import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UrlDisplayId } from '@app/common/UrlDisplay';
import { TabService } from '@app/core/services/common/tab.service';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import { BaseComponent } from '@app/pages/system/base/base.component';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import * as Const from "src/app/common/const";
import { ActionCode } from '@app/config/actionCode';
import { OptionsInterface, SearchCommonVO } from '@app/core/services/types';
import { MyTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Chitietchuyenngoai } from '@app/core/model/chitietchuyenngoai.model';
import { CtchuyenngoaiService } from '@app/core/services/http/chuyenngoai/ctchuyenngoai.service';
import { finalize } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SubwindowsearchkhachhangService } from '@app/widget/modal/subwindowsearchkhachhang/subwindowsearchkhachhang.service';
import { SubwindowsearchnguonxeService } from '@app/widget/modal/subwindowsearchnguonxe/subwindowsearchnguonxe.service';
import { ModalBtnStatus } from '@app/widget/base-modal';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Clipboard } from "@angular/cdk/clipboard"
interface SearchParam {
  ngaybatdau: string | null;
  ngayketthuc: string | null;
  idkhachhang : string;
  nguonxe : string;
  status02: any;
  soods: string;
}

@Component({
  selector: 'app-spch00253',
  templateUrl: './spch00253.component.html',
  styleUrls: ['./spch00253.component.less']
})
export class Spch00253Component extends BaseComponent implements OnInit {
  fnInit() {
    
  }
  destroy() {
    
  }
  DisplayScreenID: UrlDisplayId = UrlDisplayId.spch00253;

  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Thu hồi biên lai',
    breadcrumb: ["Home","Chuyến","Thu hồi biên lai"],
    desc: ''
  };

  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('tiencuocTpl', { static: true }) tiencuocTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('tiencuocxengoaiTpl', { static: true }) tiencuocxengoaiTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('khachhangTpl', { static: true }) khachhangTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('nguonxeTpl', { static: true }) nguonxeTpl!: TemplateRef<NzSafeAny>;


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

  searchParam: Partial<SearchParam> = {};
  dateFormat = Const.dateFormat;
  tableConfig!: MyTableConfig;
  dataList: any[] = [];
  checkedCashArray: any[] = [];
  ActionCode = ActionCode;
  availableOptions: OptionsInterface[] = [];

  khachhangnm = "";
  stockkh = ""
  nguonxenm = "";
  stocknx = "";
  
  constructor(
    protected override webService: WebserviceService,
    protected override router: Router,
    protected override cdf :  ChangeDetectorRef,
    protected override  datePipe : DatePipe,
    protected override tabService: TabService,
    public message: NzMessageService,
    private dataService: CtchuyenngoaiService,
    private modalSrv: NzModalService,
    private modalKhachHangService: SubwindowsearchkhachhangService,
    private modalNguonXeService: SubwindowsearchnguonxeService
  ) { 
    super(webService,router,cdf,datePipe,tabService);
  }

  override ngOnInit(): void {
    this.searchParam.status02 = "1";
    this.initTable();
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
        this.message.info('Không Có dữ liệu');
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

  selectedChecked(e: Chitietchuyenngoai[]): void {
    this.checkedCashArray = [...e];
  }

  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
  }

  resetForm() {
    this.searchParam = {};
    this.searchParam.status02 = "1"
    this.khachhangnm = "";
    this.nguonxenm = "";
    this.getDataList();
  }

  // show modal khach hang
  searchKhachHangClick() {
    this.modalKhachHangService.show({nzTitle: 'Danh Sách Khách Hàng'},{showcomfirm:false}).subscribe(
      res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        const param = { ...res.modalValue };
        this.searchParam.idkhachhang=param['id'];
        this.stockkh = param['id'];
        this.khachhangnm = param['name'];
      },
    )

  }

  fnFocusOutKhachhang() {
    if(this.searchParam.idkhachhang != this.stockkh) {
      this.khachhangnm = "";
    }
  }

  // show modal nguôn xe
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

  thuhoibienlai() {
    console.log(this.dataList);
    let lstId: string[] = [];
    for(let element of this.dataList) {
      if(element['_checked'] === true) {
        lstId.push(element.id);
      }
    }
    if (lstId.length > 0) {
      //  hỏi xem chắc chăn chưa
      this.modalSrv.confirm({
        nzTitle: 'Bạn có chắc chắn muốn cập nhật trạng thái?',
        nzContent: 'Không thể phục hồi sau khi cập nhật !',
        nzOnOk: () => {
           // update status02 =2 // trang thái đã lấy hóa đơn
           let req = {
              ids: lstId
           }
           this.tableLoading(true);
           this.dataService.postUpdateListId(req)
           .pipe(
              finalize(() => {
                this.tableLoading(false);
              })
           )
           .subscribe(res => {
              this.getDataList();
           })
        }
      });
      
    } else {
       this.modalSrv.info({nzTitle: "Vùi lòng chọn biên lai cần Thu hồi !"})
    }
  }

  copy(idchuyenngoai: any) {
    return `${idchuyenngoai}`;
  }

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: true,
      headers: [
        {
          title: 'Số ODS',
          field: 'soods',
          width: 300,
          tdTemplate: this.operationTpl
        },
        {
          title: 'Nguồn Xe',
          width: 300,
          field: 'nguonxe',
          tdTemplate: this.nguonxeTpl
        },
        {
          title: 'Thông tin đơn hàng',
          width: 250,
          field: 'thongtindonhang',
        },
        {
          title: 'Địa điểm bóc hàng',
          width: 200,
          field: 'diadiembochang',
        },
        {
          title: 'tiền cước',
          width: 200,
          field: 'tiencuoc',
          tdTemplate: this.tiencuocTpl
        },
        {
          title: 'tiền cước xe ngoài',
          width: 200,
          field: 'tiencuocxengoai',
          tdTemplate: this.tiencuocxengoaiTpl
        },
        {
          title: 'Khách hàng',
          width: 200,
          field: 'idkhachhang',
          tdTemplate: this.khachhangTpl
        },
        {
          title: 'Tên người nhận',
          width: 200,
          field: 'tennguoinhan'
        },
        {
          title: 'SDT người nhận',
          width: 200,
          field: 'sdtnguoinhan'
        },
        {
          title: 'Địa chỉ người nhận',
          width: 300,
          field: 'diachinguoinhan'
        },
        {
          title: 'Ghi chú',
          width: 450,
          field: 'ghichu'
        }
      ],
      total: 0,
      loading: true,
      pageSize: 10,
      pageIndex: 1
    };
  }
}
