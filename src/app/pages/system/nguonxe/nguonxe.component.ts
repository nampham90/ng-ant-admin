import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { BaseComponent } from '../base/base.component';
import { UrlDisplayId } from '@app/common/UrlDisplay';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActionCode } from '@app/config/actionCode';
import { Nguonxe } from '@app/core/model/nguonxe.model';
import { MyTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { NguonxeService } from '@app/core/services/http/nguonxe/nguonxe.service';
import { NguonxeModalService } from '@app/widget/biz-widget/system/nguonxe-modal/nguonxe.service';
import { SearchCommonVO } from '@app/core/services/types';
import { finalize } from 'rxjs';
import { ModalBtnStatus } from '@app/widget/base-modal';

interface SearchParam {
  datacd: string;
}

@Component({
  selector: 'app-nguonxe',
  templateUrl: './nguonxe.component.html',
  styleUrls: ['./nguonxe.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NguonxeComponent extends BaseComponent implements OnInit {
  override fnInit() {
   
  }
  override destroy() {
   
  }
  DisplayScreenID: UrlDisplayId = UrlDisplayId.spxe00101;

  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '',
    breadcrumb: [],
    desc: ''
  };

  searchParam: Partial<SearchParam> = {};
  tableConfig!: MyTableConfig;
  dataList: Nguonxe[]= [];
  checkedCashArray = [];
  ActionCode = ActionCode;

  @ViewChild('pageHeaderContent', { static: false }) pageHeaderContent!: TemplateRef<NzSafeAny>;
  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<any>;

  constructor(
    protected override  webService: WebserviceService,
    protected override  router: Router,
    protected override  cdf : ChangeDetectorRef,
    protected override  datePipe : DatePipe,
    public message: NzMessageService,
    private dataService : NguonxeService,
    private modalService: NguonxeModalService
  ) {
    super(webService,router,cdf,datePipe);
    this.pageHeaderInfo = {
      title: "",
      breadcrumb: ['Home','Quản lý Hệ thống',  'Quản lý nguồn xe'],
      desc: this.pageHeaderContent
    };
    this.cdf.markForCheck();
  }

  getDataList(e?: NzTableQueryParams): void {
    this.tableConfig.loading = true;
    const params: SearchCommonVO<any> = {
      pageSize: this.tableConfig.pageSize!,
      pageNum: e?.pageIndex || this.tableConfig.pageIndex!,
      filters: this.searchParam
    };
    this.dataService
      .postAll(params)
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
        this.checkedCashArray = [...this.checkedCashArray];
      });
  }

  tableLoading(isLoading: boolean): void {
    this.tableConfig.loading = isLoading;
    this.tableChangeDectction();
  }

  tableChangeDectction(): void {
    this.dataList = [...this.dataList];
    this.cdf.detectChanges();
  }

  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
  }

  resetForm(): void {
    this.searchParam = {};
    this.getDataList();
  }

  // làm mới table
  reloadTable(): void {
    this.message.info('Làm mới thành công');
    this.getDataList();
  }

  // thêm mơi nguồn xe
  add(){
     this.modalService.show({nzTitle: 'Thêm mới'}).subscribe(
       res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        this.tableLoading(true);
        this.addEditData(res.modalValue, 'postCreate');
       }
     )
  }

  addEditData(param: Nguonxe, methodName: 'postCreate' | 'postCreate'): void {
    this.dataService[methodName](param)
      .pipe(
        finalize(() => {
          this.tableLoading(false);
        })
      )
      .subscribe(() => {
        this.getDataList();
      });
  }

  override ngOnInit(): void {
    this.initTable();
  }

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: false,
      headers: [
        {
          title: 'ID nguồn xe',
          field: 'datacd',
          width: 150
        },
        {
          title: 'Tên nguồn xe',
          width: 300,
          field: 'datanm'
        },
        {
          title: 'Số điện thoại',
          width: 200,
          field: 'sodienthoai'
        },
        {
          title: 'Địa chỉ',
          width: 200,
          field: 'diachi'
        },
        {
          title: 'Thông tin thanh toán 1',
          width: 500,
          field: 'thongtinthanhtoan1'
        },
        {
          title: 'Thông tin thanh toán 1',
          width: 500,
          field: 'thongtinthanhtoan2'
        },
        {
          title: 'Vận hành',
          tdTemplate: this.operationTpl,
          width: 280,
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
