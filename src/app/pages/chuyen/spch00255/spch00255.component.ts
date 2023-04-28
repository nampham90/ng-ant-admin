import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UrlDisplayId } from '@app/common/UrlDisplay';
import { LayoutPdfService } from '@app/core/services/common/layout-pdf.service';
import { TabService } from '@app/core/services/common/tab.service';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import { DonhangexportxengoaiService } from '@app/core/services/http/donhangexportxengoai/donhangexportxengoai.service';
import { BaseComponent } from '@app/pages/system/base/base.component';
import { SubwindowsearchnguonxeService } from '@app/widget/modal/subwindowsearchnguonxe/subwindowsearchnguonxe.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import * as Const from '@app/common/const';
import { ActionCode } from '@app/config/actionCode';
import { MyTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { OptionsInterface, SearchCommonVO } from '@app/core/services/types';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import  _ from 'lodash';
import { ModalBtnStatus } from '@app/widget/base-modal';
import { finalize } from 'rxjs';
import { VideoyoutubeService } from '@app/widget/modal/subwindowvideoyoutube/videoyoutube.service';
interface SearchParam {
  ngaybatdau: string | null;
  ngayketthuc: string | null;
  nguonxe : string;
  status02: number | string; // tráng thái thánh toán của đơn hàng
  sohdttxn: string;
}
@Component({
  selector: 'app-spch00255',
  templateUrl: './spch00255.component.html',
  styleUrls: ['./spch00255.component.less']
})
export class Spch00255Component extends BaseComponent implements OnInit {
  fnInit() {
    
  }
  destroy() {
    
  }
  DisplayScreenID: UrlDisplayId = UrlDisplayId.spch00255;

  constructor(
    protected override webService: WebserviceService,
    protected override router: Router,
    protected override cdf :  ChangeDetectorRef,
    protected override  datePipe : DatePipe,
    protected override tabService: TabService,
    protected override modalVideoyoutube: VideoyoutubeService,
    private dataService : DonhangexportxengoaiService,
    public message: NzMessageService,
    private modalSrv: NzModalService,
    private pdfService: LayoutPdfService,
    private modalNguonXeService: SubwindowsearchnguonxeService,
    
  ) {
    super(webService,router,cdf,datePipe,tabService,modalVideoyoutube);
  }

  searchParam: Partial<SearchParam> = {};
  dateFormat = Const.dateFormat;
  tableConfig!: MyTableConfig;
  dataList: any[] = [];
  checkedCashArray: any[] = [];
  ActionCode = ActionCode;
  availableOptions: OptionsInterface[] = [];

  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Thanh toán chuyến ngoài',
    breadcrumb: ["Home","Chuyến","Thanh toán chuyến ngoài"],
    desc: ''
  };

  nguonxenm = "";
  stocknx = "";

  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('nguonxeTpl', { static: true }) nguonxeTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('status02Tpl', { static: true }) status02Tpl!: TemplateRef<NzSafeAny>;

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
  
  override ngOnInit(): void {
    this.searchParam.status02 = "0";
    this.initTable();
  }

  getDataList(e?: NzTableQueryParams) {
    this.tableLoading(true);
    this.searchParam.ngaybatdau = this.formatDate(this.ngaybatdau);
    this.searchParam.ngayketthuc = this.formatDate(this.ngayketthuc);
    this.searchParam.status02 = _.toNumber(this.searchParam.status02);
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
        //this.message.info('Không Có dữ liệu');
      }
      this.tableConfig.total = total!;
      this.tableConfig.pageIndex = pageNum!;
      this.tableLoading(false);
      this.checkedCashArray = [...this.checkedCashArray];
      this.searchParam.status02 = this.searchParam.status02 + "";
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

  
  selectedChecked(e: any[]): void {
    this.checkedCashArray = [...e];
  }

  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
  }

  resetForm() {
    this.searchParam = {};
    this.searchParam.status02 = 0
    this.nguonxenm = "";
    this.getDataList();
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
        this.getDataList();
      },
    )
  }

  fnFocusOutNguonxe() {
    if(this.searchParam.nguonxe != this.stocknx) {
      this.nguonxenm = "";
    }
  }

  exportPDF(id: string) {
    this.dataService.postDetail({id:id}).pipe()
    .subscribe(async data => {
      if(data) {
        let filename = data['sohdttxn'];
        this.pdfService.clearHeader();
        await this.pdfService.exportPDF(data['header'],data['lstheader'],data['lstdata'],data['title'],this.getDate(),"BVC ký xác nhận","BTT ký xác nhận",filename);
      } else {
         this.modalSrv.error({nzTitle: "Lỗi hệ thống ! vui long liên hệ bộ phận kỷ thuật"});
      }
      
    })
  }

  thanhtoan(id: string) {
    this.modalSrv.confirm({
      nzTitle: "Bạn chắc chắn muốn thánh toán đơn này không ?",
      nzContent: "Nhấn OK để tiếp tục !",
      nzOnOk: () => {
        this.dataService.postUpdateStatus({id:id}).pipe()
        .subscribe(data => {
           if(data == 1) {
              this.getDataList();
              this.message.success("Thanh toán thành công");
           } else {
              this.message.error("Lỗi hệ thống. Vui lòng liên hệ kỷ thuật");
           }
        })
      }
    })
  }
  private initTable(): void {
    this.tableConfig = {
      showCheckbox: false,
      headers: [
        {
          title: 'Ngày Xuất',
          field: 'ngayxuat',
          width: 200,
          pipe: "date: dd/MM/YYYY HH:mm"
        },
        {
          title: 'Số HDTTXN',
          width: 300,
          field: 'sohdttxn',
        },
        {
          title: 'Nguồn xe',
          width: 300,
          field: 'nguonxe',
          tdTemplate: this.nguonxeTpl
        },
        {
          title: 'Trạng thai',
          width: 200,
          field: 'status02',
          tdTemplate: this.status02Tpl
        },
        {
          title: 'Số lần xuất PDF',
          width: 200,
          field: 'status01',
        },
        {
          title: 'Ghi chú',
          width: 150,
          field: 'ghichu',
        },
        {
          title: 'Hành động',
          tdTemplate: this.operationTpl,
          width: 200,
          fixed: true,
          fixedDir: 'right'
        }
      ],
      total: 0,
      loading: true,
      pageSize: 10,
      pageIndex: 1
    };
  }

}
