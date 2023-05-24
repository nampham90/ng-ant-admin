import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { UrlDisplayId } from '@app/common/UrlDisplay';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { TabService } from '@app/core/services/common/tab.service';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import { VideoyoutubeService } from '@app/widget/modal/subwindowvideoyoutube/videoyoutube.service';
import * as Const from "src/app/common/const";
import { ActionCode } from '@app/config/actionCode';
import { MyTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { SearchCommonVO } from '@app/core/services/types';
import { Spin00901Service } from '@app/core/services/http/trongkho/spin00901.service';
import { finalize } from 'rxjs';
import { Tmt050modalService } from '@app/widget/biz-widget/system/tmt050modal/tmt050modal.service';
import { ModalBtnStatus } from '@app/widget/base-modal';
import { Spin00901Model } from '@app/core/model/trongkho/spin00901.model';

interface SearchParam {
  datacd: string;
  rcdkbn: string;
}

interface ChiPhi {
  idchuyen: string;
  tenchiphi: string;
  sotien: number;
  ghichu: string;
}

@Component({
  selector: 'app-spcm01102',
  templateUrl: './spcm01102.component.html',
  styleUrls: ['./spcm01102.component.less']
})
export class Spcm01102Component extends BaseComponent implements OnInit {
  
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

  lstchiphi: ChiPhi[] = [];

  override fnInit() {
    this.pageHeaderInfo = {
      title: this.formItemNm[3],
      breadcrumb: [this.formItemNm[1], this.formItemNm[2],this.formItemNm[3]],
      desc: ''
    };

    this.initTable();
    
  }
  override destroy() {
    
  }
  override DisplayScreenID: UrlDisplayId = UrlDisplayId.spcm01102;

  constructor(
    protected override webService: WebserviceService,
    protected override router: Router,
    protected override cdf :  ChangeDetectorRef,
    protected override  datePipe : DatePipe,
    protected override tabService: TabService,
    protected override modalVideoyoutube: VideoyoutubeService,
    public message: NzMessageService,
    private modalSrv: NzModalService,
    private dataService: Spin00901Service,
    private tmt050modalService: Tmt050modalService,
    private spin00901Service: Spin00901Service,
  ) { 
    super(webService,router,cdf,datePipe,tabService,modalVideoyoutube);
  }

  add() {
    let req = {
      "datacd": "Tên chi phí",
      "datanm": "Tên chi phí hiển thị",
      "datarnm": "Tên chi phí dự phòng",
    }

    this.tmt050modalService.show({nzTitle: " Thêm mới xe"},req).subscribe(
      res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        res.modalValue.rcdkbn = Const.tmt050lstchiphi;
        res.modalValue.mode = "KHAC";
        this.addEditData(res.modalValue, 'create');
      }
    )
  }

  allDel() {

  }

  edit(id:any) {
    this.spin00901Service.Detail({id:id})
    .pipe()
    .subscribe(res => {
      let req = {
        "datacd": "Tên chi phí",
        "datanm": "Tên chi phí hiển thị",
        "datarnm": "Tên chi phí dự phòng",
        "data": res
      }
      this.tmt050modalService.show({nzTitle: "Cập nhật"},req).subscribe(({ modalValue, status })=> {
        if (status === ModalBtnStatus.Cancel) {
          return;
        }
        modalValue.id = id;
        this.addEditData(modalValue, 'update');
      })
    })
  }

  del(id:any) {
    this.modalSrv.confirm(
      {
        nzTitle: "Bạn có chắc chắn muốn xóa không !",
        nzContent: "Sau khi xóa dử liệu không thể khôi phục.",
        nzOnOk: () => {
          this.spin00901Service.delete({id:id}).pipe()
          .subscribe(res => {
            if(res['deletedCount'] == 1) {
              if (this.dataList.length === 1) {
                this.tableConfig.pageIndex--;
              }
              this.getDataList();
            } else {
              this.message.info("Thực hiện không thành công !");
            }
          })
        }
    })
  }

  addEditData(param: Spin00901Model, methodName: 'update' | 'create'): void {
    this.spin00901Service[methodName](param)
    .pipe(
      finalize(() => {
        this.tableLoading(false);
      })
    )
    .subscribe(() => {
      this.getDataList();
    }); 
  }

  getDataList(e?: NzTableQueryParams) {
    this.searchParam.rcdkbn = Const.tmt050lstchiphi;
    if(this.searchParam.datacd == "") {
      this.resetForm();
    }
    this.tableLoading(true);
    const params: SearchCommonVO<any> = {
      pageSize: this.tableConfig.pageSize!,
      pageNum: e?.pageIndex || this.tableConfig.pageIndex!,
      filters: this.searchParam
    };
    this.dataService.searchParams(params)
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
    })
  }

  resetForm() {
    this.searchParam = {}
    this.searchParam.rcdkbn = Const.tmt050lstchiphi;
  }

  reloadTable() {
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
          title: this.formItemNm[11],
          field: 'datacd',
          width: 180,
        },
        {
          title: this.formItemNm[12],
          width: 180,
          field: 'datanm',
        },
        {
          title: this.formItemNm[13],
          tdTemplate: this.operationTpl,
          width: 160,
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