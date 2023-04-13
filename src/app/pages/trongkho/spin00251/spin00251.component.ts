import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UrlDisplayId } from '@app/common/UrlDisplay';
import { TabService } from '@app/core/services/common/tab.service';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import { BaseComponent } from '@app/pages/system/base/base.component';
import { VideoyoutubeService } from '@app/widget/modal/subwindowvideoyoutube/videoyoutube.service';
import * as Const from "src/app/common/const";
import { ActionCode } from '@app/config/actionCode';
import { MyTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-spin00251',
  templateUrl: './spin00251.component.html',
  styleUrls: ['./spin00251.component.less']
})


export class Spin00251Component extends BaseComponent implements OnInit {
  
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '',
    breadcrumb: ['', '', '']
  };

  //searchParam: Partial<SearchParam> = {};
  dateFormat = Const.dateFormat;
  tableConfig!: MyTableConfig;
  dataList: any[] = [];
  checkedCashArray: any[] = [];
  ActionCode = ActionCode;

  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;


  override fnInit() {

    this.pageHeaderInfo = {
      title: this.formItemNm[3],
      breadcrumb: [this.formItemNm[1], this.formItemNm[2],this.formItemNm[3]],
      desc: ''
    };
   
  }
  override destroy() {
   
  }
  override DisplayScreenID: UrlDisplayId = UrlDisplayId.spin00251;

  constructor(
    protected override webService: WebserviceService,
    protected override router: Router,
    protected override cdf :  ChangeDetectorRef,
    protected override  datePipe : DatePipe,
    protected override tabService: TabService,
    protected override modalVideoyoutube: VideoyoutubeService,
    public message: NzMessageService,
    private modalSrv: NzModalService,
  ) { 
    super(webService,router,cdf,datePipe,tabService,modalVideoyoutube);
  }

}
