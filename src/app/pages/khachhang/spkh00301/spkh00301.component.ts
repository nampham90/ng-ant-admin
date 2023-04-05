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

interface SearchParam {
  urldisplayid: string;
}
@Component({
  selector: 'app-spkh00301',
  templateUrl: './spkh00301.component.html',
  styleUrls: ['./spkh00301.component.less']
})

export class Spkh00301Component extends BaseComponent implements OnInit{

  fnInit() {
    this.pageHeaderInfo = {
      title: this.formItemNm[1],
      breadcrumb: [this.formItemNm[2], this.formItemNm[3],this.formItemNm[1]],
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

  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;

  constructor(
    protected override webService: WebserviceService,
    protected override router: Router,
    protected override cdf :  ChangeDetectorRef,
    protected override  datePipe : DatePipe,
    protected override tabService: TabService,
    protected override modalVideoyoutube: VideoyoutubeService,
    public message: NzMessageService,
  ) { 
    super(webService,router,cdf,datePipe,tabService,modalVideoyoutube);
  }

  getDataList(e?: NzTableQueryParams) {
    
  }

  searchName($event: any) {
    
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
