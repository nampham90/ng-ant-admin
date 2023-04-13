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
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Spin00901Service } from '@app/core/services/http/trongkho/spin00901.service';
import { SearchCommonVO } from '@app/core/services/types';
import { finalize } from 'rxjs';
import { Spin00901subService } from '@app/widget/modal/trongkho/spin00901sub/spin00901sub.service';
import { ModalBtnStatus } from '@app/widget/base-modal';
import { Spin00901Model } from '@app/core/model/trongkho/spin00901.model'

interface SearchParam {
  datacd: string;
}
@Component({
  selector: 'app-spin00901',
  templateUrl: './spin00901.component.html',
  styleUrls: ['./spin00901.component.less']
})
export class Spin00901Component extends BaseComponent implements OnInit {
  
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

  override DisplayScreenID: UrlDisplayId = UrlDisplayId.spin00901;

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
    private spin00901subSevice: Spin00901subService
  ) { 
    super(webService,router,cdf,datePipe,tabService,modalVideoyoutube);
  }

  add() {
    this.spin00901subSevice.show({nzTitle: "Thêm mơi"}).subscribe(
      res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        this.addEditData(res.modalValue,"create");
      }
    )
  }

  edit(id:any) {
    this.dataService.Detail({id:id})
    .pipe()
    .subscribe(res => {
      this.spin00901subSevice.show({nzTitle: "Cập nhật"},res).subscribe(({ modalValue, status })=> {
        if (status === ModalBtnStatus.Cancel) {
          return;
        }
        modalValue.id = id;
        this.addEditData(modalValue, 'update');
      })
    })
    
  }

  addEditData(param: Spin00901Model, methodName: 'update' | 'create'): void {
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
  
  del(id:any) {
    this.modalSrv.confirm(
      {
        nzTitle: "Bạn có chắc chắn muốn xóa không !",
        nzContent: "Sau khi xóa dử liệu không thể khôi phục.",
        nzOnOk: () => {
          this.dataService.delete({id:id}).pipe()
          .subscribe(res => {
            if(res['deletedCount'] == 1) {
              if (this.dataList.length === 1) {
                this.tableConfig.pageIndex--;
              }
              this.getDataList();
              this.resetForm();
            } else {
              this.message.info("Thực hiện không thành công !");
            }
          })
        }
    })
  }

  allDel() {
    if(this.dataList.length > 0) {
      this.modalSrv.confirm(
        {
          nzTitle: "Bạn có chắc chắn muốn xóa không !",
          nzContent: "Sau khi xóa dử liệu không thể khôi phục.",
          nzOnOk: () => {
            this.dataService.deleteAll({id:this.fngetListId()}).pipe()
            .subscribe(res => {
              this.getDataList();
              this.resetForm();
            })
          }
      })
    } else {
      this.modalSrv.info({nzTitle: "Không có dư liệu"});
    }

  }

  fngetListId() {
    let listId: any[] = [];
    for(let element of this.dataList) {
      listId.push(element['id']);
    }
    return listId;
  }

  getDataList(e?: NzTableQueryParams) {
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
          width: 120,
          field: 'status01',
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
