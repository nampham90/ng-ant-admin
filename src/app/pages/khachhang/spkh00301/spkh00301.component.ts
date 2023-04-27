import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UrlDisplayId } from '@app/common/UrlDisplay';
import { TabService } from '@app/core/services/common/tab.service';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import { BaseComponent } from '@app/pages/system/base/base.component';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { VideoyoutubeService } from '@app/widget/modal/subwindowvideoyoutube/videoyoutube.service';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as Const from "src/app/common/const";
import { ActionCode } from '@app/config/actionCode';
import { MyTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { Spin00251subkhachhangService } from '@app/widget/modal/trongkho/spin00251subkhachhang/spin00251subkhachhang.service';
import { ModalBtnStatus } from '@app/widget/base-modal';
import { SearchCommonVO } from '@app/core/services/types';
import { Spkh00301Service } from '@app/core/services/http/khachhang/spkh00301.service';
import { finalize } from 'rxjs';

interface SearchParam {
  ngaybatdau: string | null;
  ngayketthuc: string | null;
  soODC: string;
  iduser: string;
  status01: number | null;
}
@Component({
  selector: 'app-spkh00301',
  templateUrl: './spkh00301.component.html',
  styleUrls: ['./spkh00301.component.less']
})

export class Spkh00301Component extends BaseComponent implements OnInit{

  fnInit() {
    this.pageHeaderInfo = {
      title: this.formItemNm[3],
      breadcrumb: [this.formItemNm[1], this.formItemNm[2],this.formItemNm[3]],
      desc: ''
    };
    this.initTable();
  }
  destroy() {
    
  }
  DisplayScreenID: UrlDisplayId = UrlDisplayId.spkh00301;

  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '',
    breadcrumb: ['', '', '']
  };

  searchParam: Partial<SearchParam> = {};
  dateFormat = Const.dateFormat;
  tableConfig!: MyTableConfig;
  dataList: any[] = [];
  checkedCashArray: any[] = [];
  ActionCode = ActionCode;

  usernm = "";
  stockuser = "";

  checkOptionStatus = [
    { label: 'Chờ thanh toán', value: 0, checked: false },
    { label: 'Đã thánh toán', value: 1, checked: false }
  ];

  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('linkTpl', { static: true }) linkTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('tenkhachhangTpl', { static: true }) tenkhachhangTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('trangthaiTpl', { static: true }) trangthaiTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('tiencuocTpl', { static: true }) tiencuocTpl!: TemplateRef<NzSafeAny>;

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

  constructor(
    protected override webService: WebserviceService,
    protected override router: Router,
    protected override cdf :  ChangeDetectorRef,
    protected override  datePipe : DatePipe,
    protected override tabService: TabService,
    protected override modalVideoyoutube: VideoyoutubeService,
    public message: NzMessageService,
    private spin00251subkhachhangService: Spin00251subkhachhangService,
    private spkh00301Service: Spkh00301Service
  ) { 
    super(webService,router,cdf,datePipe,tabService,modalVideoyoutube);
  }

  changeStatus01(): void {
    if (this.checkOptionStatus.every(item => item.checked)) {
       this.searchParam.status01 = null;
    } else {
       if(this.checkOptionStatus[0].checked == true) {
         this.searchParam.status01 = 0;
       } else if(this.checkOptionStatus[1].checked == true) {
         this.searchParam.status01 = 1;
       } else {
         this.searchParam.status01 = null;
       }
    }
  }

  fnFocusOutUser() {
    if(this.searchParam.iduser != this.stockuser) {
      this.usernm = "";
    }
  }

  searchUserClick() {
    this.spin00251subkhachhangService.show({nzTitle: "Danh sách khách hàng"},{showcomfirm:false}).subscribe(
      res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        const param = { ...res.modalValue };
        this.searchParam.iduser = param['id'];
        this.stockuser = param['id'];
        this.usernm = param['name'];

      }
    )
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
    this.spkh00301Service.search(params)
    .pipe(
      finalize(() => {
        this.tableLoading(false);
      })
    )
    .subscribe(data=>{
      const { list, total, pageNum } = data;
      this.dataList = [...list];
      this.tableConfig.total = total!;
      this.tableConfig.pageIndex = pageNum!;
      this.tableLoading(false);
      this.checkedCashArray = [...this.checkedCashArray];
    })
  }

  resetForm() {
    this.searchParam = {};
    this.usernm = "";
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

  copy(soodc: any) {
    return `${soodc}`;
  }

  getItem(soodc: any) {

  }

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: false,
      headers: [
        {
          title: "Số ODC",
          field: 'soodc',
          width: 180,
          tdTemplate: this.linkTpl
        },
        {
          title: "Tống cước",
          field: 'tongcuoc',
          width: 180,
          tdTemplate: this.tiencuocTpl
        },
        {
          title: "Khách hàng",
          field: 'tenkhachhang',
          width: 180,
          tdTemplate: this.tenkhachhangTpl
        },
        {
          title: "Trạng thái",
          width: 180,
          field: 'trangthai',
          tdTemplate: this.trangthaiTpl
        },
        {
          title: "Ngày xuất",
          width: 120,
          field: 'ngayxuat',
          pipe: 'date: dd/MM/yyyy:HH:ss'
        },
        {
          title: "Ngày thanh toán",
          width: 150,
          field: 'ngaythanhtoan',
          pipe: 'date: dd/MM/yyyy:HH:ss'
        },
        {
          title: "Vận hành",
          tdTemplate: this.operationTpl,
          width: 250,
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
