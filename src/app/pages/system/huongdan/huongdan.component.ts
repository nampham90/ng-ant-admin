import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UrlDisplayId } from '@app/common/UrlDisplay';
import { TabService } from '@app/core/services/common/tab.service';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { VideoyoutubeService } from '@app/widget/modal/subwindowvideoyoutube/videoyoutube.service';
import { BaseComponent } from '@app/pages/system/base/base.component';
import * as Const from "src/app/common/const";
import { ActionCode } from '@app/config/actionCode';
import { MyTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { HuongdanService } from '@app/core/services/http/system/huongdan.service';
import { SearchCommonVO } from '@app/core/services/types';
import { finalize } from 'rxjs';
import { HuongdanModalService } from '@app/widget/biz-widget/system/huongdan-modal/huongdan.service';
import { ModalBtnStatus } from '@app/widget/base-modal';
interface SearchParam {
  urldisplayid: string;
}
@Component({
  selector: 'app-huongdan',
  templateUrl: './huongdan.component.html',
  styleUrls: ['./huongdan.component.less']
})
export class HuongdanComponent extends BaseComponent implements OnInit {
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
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '',
    breadcrumb: ['', '', '']
  };
  DisplayScreenID: UrlDisplayId = UrlDisplayId.huongdan;

  searchParam: Partial<SearchParam> = {};
  dateFormat = Const.dateFormat;
  tableConfig!: MyTableConfig;
  dataList: any[] = [];
  checkedCashArray: any[] = [];
  ActionCode = ActionCode;

  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;

  constructor(
    protected override  webService: WebserviceService,
    protected override  router: Router,
    protected override  cdf : ChangeDetectorRef,
    protected override  datePipe : DatePipe,
    protected override modalVideoyoutube: VideoyoutubeService,
    protected override tabService : TabService,
    public message: NzMessageService,
    private dataService: HuongdanService,
    private modalHuongdan:HuongdanModalService
  ) {
    super(webService,router,cdf,datePipe,tabService,modalVideoyoutube);
  }

  add() {
     this.modalHuongdan.show({ nzTitle:'Thêm mới' }).subscribe( //  this.formItemNm[15]
      res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        this.tableLoading(true);
        this.addEditData(res.modalValue, 'Create');
      },
      error => this.tableLoading(false)
    );
  }
  
  allDel() {}
  edit(id: any) {

  }

  addEditData(param: any, methodName: 'Update' | 'Create'): void {
    this.dataService[methodName](param)
      .pipe(
        finalize(() => {
          this.tableLoading(false);
        })
      )
      .subscribe(res => {
        this.getDataList();
      });
  }

  getDataList(e?: NzTableQueryParams) {
    this.tableLoading(true);
    const params: SearchCommonVO<any> = {
      pageSize: this.tableConfig.pageSize!,
      pageNum: e?.pageIndex || this.tableConfig.pageIndex!,
      filters: this.searchParam
    };

    this.dataService.PostAll(params).pipe(
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

  searchName($event: any) {
    const params: SearchCommonVO<any> = {
      pageSize: this.tableConfig.pageSize!,
      pageNum: 1,
      filters: $event.target.value
    };
    this.dataService.PostSearchParams(params).pipe(
      finalize(() => {
        this.tableLoading(false);
      })
    )
    .subscribe(data => {
      console.log(data);
      const { list, total, pageNum } = data;
      this.dataList = [...list];
      this.tableConfig.total = total!;
      this.tableConfig.pageIndex = pageNum!;
      this.tableLoading(false);
      this.checkedCashArray = [...this.checkedCashArray];
    });
  }

  resetForm() {
    this.searchParam = {};
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

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: false,
      headers: [
        {
          title: this.formItemNm[12],
          field: 'idyoutube',
          width: 180,
        },
        {
          title: this.formItemNm[13],
          width: 180,
          field: 'urldisplayid',
        },
        {
          title: this.formItemNm[14],
          width: 120,
          field: 'title',
        },
        {
          title: this.formItemNm[15],
          width: 150,
          field: 'content',
        },
        {
          title: this.formItemNm[16],
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
