import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UrlDisplayId } from '@app/common/UrlDisplay';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import { BaseComponent } from '@app/pages/system/base/base.component';
import * as Const from '@app/common/const';
import { ActionCode } from '@app/config/actionCode';
import { OptionsInterface, SearchCommonVO } from '@app/core/services/types';
import { MyTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Chuyenngoai } from '@app/core/model/chuyenngoai.model';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ChuyenngoaiService } from '@app/core/services/http/chuyenngoai/chuyenngoai.service';
import { finalize } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NguonxeService } from '@app/core/services/http/nguonxe/nguonxe.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TabService } from '@app/core/services/common/tab.service';

interface SearchParam {
  ngaybatdau: string | null;
  ngayketthuc: string | null;
  nguonxe : string;
  biensoxe: string;
}

@Component({
  selector: 'app-spch00252',
  templateUrl: './spch00252.component.html',
  styleUrls: ['./spch00252.component.less']
})
export class Spch00252Component extends BaseComponent implements OnInit {

  override fnInit() {
    
  }
  override destroy() {
    
  }
  override DisplayScreenID: UrlDisplayId =  UrlDisplayId.spch00251;

  searchParam: Partial<SearchParam> = {};
  dateFormat = Const.dateFormat;
  tableConfig!: MyTableConfig;
  dataList: any[] = [];
  checkedCashArray: any[] = [];
  ActionCode = ActionCode;
  availableOptions: OptionsInterface[] = [];

  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Tìm kiếm chuyến ngoài',
    breadcrumb: ["Home","Chuyến","Tìm kiếm chuyến ngoài"],
    desc: ''
  };

  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('nguonxeTpl', { static: true }) nguonxeTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('machuyenngoaiTpl', { static: true }) machuyenngoaiTpl!: TemplateRef<NzSafeAny>;

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

  listnguonxe: any = [];
  showUpdate = false;
  showDelete = false;

  constructor(
    protected override webService: WebserviceService,
    protected override router: Router,
    protected override cdf :  ChangeDetectorRef,
    protected override  datePipe : DatePipe,
    private dataService: ChuyenngoaiService,
    private modalSrv: NzModalService,
    private nguonxeService: NguonxeService,
    public message: NzMessageService,
    protected override tabService: TabService
  ) { 
    super(webService,router,cdf,datePipe,tabService);
  }

  override ngOnInit(): void {
    this.fnGetAllNguonXe();
    this.initTable();
  }

  reloadTable(): void {
    this.message.info('Đã được làm mới');
    this.getDataList();
  }

  getDataList(e?: NzTableQueryParams) {
    this.tableLoading(true);
    const params: SearchCommonVO<any> = {
      pageSize: this.tableConfig.pageSize!,
      pageNum: e?.pageIndex || this.tableConfig.pageIndex!,
      filters: this.searchParam
    };
    this.dataService.postallChuyenngoai(params)
    .pipe(
      finalize(()=>{
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

  selectedChecked(e: Chuyenngoai[]): void {
    this.checkedCashArray = [...e];
  }

  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
  }

  tableChangeDectction(): void {
    this.dataList = [...this.dataList];
    this.cdf.detectChanges();
  }

  tableLoading(isLoading: boolean): void {
    this.tableConfig.loading = isLoading;
    this.tableChangeDectction();
  }

  resetForm() {
    this.searchParam = {};

    this.getDataList();
 }

  add() {

  }

  allDel() {

  }

  transferSpch00251(id: string, mode: string) {
    this.transfer(Const.rootbase + UrlDisplayId.spch00251);
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

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: true,
      headers: [
        {
          title: 'Mã chuyến ngoài',
          field: 'id',
          width: 250,
          tdTemplate: this.machuyenngoaiTpl
        },
        {
          title: 'Nguồn xe',
          width: 300,
          field: 'nguonxe',
          tdTemplate: this.nguonxeTpl
        },
        {
          title: 'Ngày vận chuyển',
          width: 200,
          field: 'ngayvanchuyen',
          pipe: "date: dd/MM/YYYY HH:mm"
        },
        {
          title: 'Biển số xe',
          width: 150,
          field: 'biensoxe',
        },
        {
          title: 'Số điện thoại',
          width: 150,
          field: 'sdtnguonxe',
        },
        {
          title: 'Tên tài xế',
          width: 250,
          field: 'tentaixe',
        },
        {
          title: 'SDT tài xế',
          width: 200,
          field: 'sodienthoai',
        },
        {
          title: 'Hành động',
          tdTemplate: this.operationTpl,
          width: 300,
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
