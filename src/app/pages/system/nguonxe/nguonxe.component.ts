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
import { NzModalService } from 'ng-zorro-antd/modal';
import { TabService } from '@app/core/services/common/tab.service';
import { VideoyoutubeService } from '@app/widget/modal/subwindowvideoyoutube/videoyoutube.service';
import { Tmt050modalService } from '@app/widget/biz-widget/system/tmt050modal/tmt050modal.service';
import { Spin00901Service } from '@app/core/services/http/trongkho/spin00901.service';
import { Tmt050Service } from '@app/core/services/http/system/tmt050.service';

interface SearchParam {
  datacd: string;
}

interface SearchParamRCDKBN {
  rcdkbn: string;
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

  // table bien so xe
  searchBiensoxe: Partial<SearchParamRCDKBN> = {};
  tableConfigBiensoxe!: MyTableConfig;
  dataListBiensoxe: any[] = [];
  checkedCashArrayBiensoxe: any[] = [];

  // table tai xe
  searchTaixe: Partial<SearchParamRCDKBN> = {};
  tableConfigTaixe!: MyTableConfig;
  dataListTaixe: any[] = [];
  checkedCashArrayTaixe: any[] = [];

  // detail
  idnguonxe = "";
  tennguonxe = "";
  sodienthoainguonxe = "";
  diachinguonxe = "";
  thongtinthanhtoan1 = "";
  thongtinthanhtoan2 = "";

  @ViewChild('pageHeaderContent', { static: false }) pageHeaderContent!: TemplateRef<NzSafeAny>;
  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<any>;
  @ViewChild('operationBsxTpl', { static: true }) operationBsxTpl!: TemplateRef<any>;
  @ViewChild('operationTxTpl', { static: true }) operationTxTpl!: TemplateRef<any>;
  @ViewChild('linkTpl', { static: true }) linkTpl!: TemplateRef<any>;

  constructor(
    protected override  webService: WebserviceService,
    protected override  router: Router,
    protected override  cdf : ChangeDetectorRef,
    protected override  datePipe : DatePipe,
    protected override modalVideoyoutube: VideoyoutubeService,
    public message: NzMessageService,
    private dataService : NguonxeService,
    private modalService: NguonxeModalService,
    private modalSrv: NzModalService,
    protected override tabService: TabService,
    private tmt050modalService: Tmt050modalService,
    private spin00901Service: Spin00901Service,
    private tmt050Service: Tmt050Service
  ) {
    super(webService,router,cdf,datePipe,tabService,modalVideoyoutube);
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

  // table hiển thị danh sách biển số xe==============================
  getDataListBiensoxe(e?: NzTableQueryParams): void {
    this.tableConfigBiensoxe.loading = true;
    const params: SearchCommonVO<any> = {
      pageSize: this.tableConfigBiensoxe.pageSize!,
      pageNum: e?.pageIndex || this.tableConfigBiensoxe.pageIndex!,
      filters: this.searchBiensoxe
    };
    if(this.searchBiensoxe.rcdkbn && this.searchBiensoxe.rcdkbn != "") {
      this.tmt050Service.getListKBN(params)
      .pipe(
        finalize(() => {
          this.tableLoadingBiensoxe(false);
        })
      )
      .subscribe(data => {
        const { list, total, pageNum } = data;
        this.dataListBiensoxe = [...list];
        this.tableConfigBiensoxe.total = total!;
        this.tableConfigBiensoxe.pageIndex = pageNum!;
        this.tableLoadingBiensoxe(false);
        this.checkedCashArrayBiensoxe = [...this.checkedCashArrayBiensoxe];
      });
    } else {
      this.dataListBiensoxe = [];
      this.tableLoadingBiensoxe(false);
    }
  }

  tableChangeDectctionBiensoxe(): void {
    this.dataListBiensoxe = [...this.dataListBiensoxe];
    this.cdf.detectChanges();
  }

  changePageSizeBiensoxe(e: number): void {
    this.tableConfigBiensoxe.pageSize = e;
  }

  reloadTableBiensoxe(): void {
    this.message.info('Làm mới thành công');
    this.getDataListBiensoxe();
  }

  tableLoadingBiensoxe(isLoading: boolean): void {
    this.tableConfigBiensoxe.loading = isLoading;
    this.tableChangeDectctionBiensoxe();
  }

  selectedCheckedBiensoxe(e: any[]): void {
    this.checkedCashArrayBiensoxe = [...e];
  }

  private initTableBiensoxe(): void {
    this.tableConfigBiensoxe = {
      showCheckbox: false,
      headers: [
        {
          title: 'Biển số xe',
          field: 'datacd',
          width: 150,
        },
        {
          title: 'Bsx Dự phòng',
          width: 300,
          field: 'datanm'
        },
        {
          title: 'Vận hành',
          tdTemplate: this.operationBsxTpl,
          width: 280,
          fixed: true,
          fixedDir: 'right'
        }
      ],
      total: 0,
      loading: true,
      pageSize: 10,
      pageIndex: 1
    }
  }

  editbsx(id: any){

  }

  delbsx(id: any){
    
  }

  // table hiển thị danh sách Tai xe==================================
  getDataListTaixe(e?: NzTableQueryParams): void {
    this.tableConfigTaixe.loading = true;
    const params: SearchCommonVO<any> = {
      pageSize: this.tableConfigTaixe.pageSize!,
      pageNum: e?.pageIndex || this.tableConfigTaixe.pageIndex!,
      filters: this.searchTaixe
    };
    if(this.searchTaixe.rcdkbn && this.searchTaixe.rcdkbn != "") {
      this.tmt050Service.getListKBN(params)
      .pipe(
        finalize(() => {
          this.tableLoadingTaixe(false);
        })
      )
      .subscribe(data => {
        const { list, total, pageNum } = data;
        this.dataListTaixe = [...list];
        this.tableConfigTaixe.total = total!;
        this.tableConfigTaixe.pageIndex = pageNum!;
        this.tableLoadingTaixe(false);
        this.checkedCashArrayTaixe = [...this.checkedCashArrayTaixe];
      });
    } else {
      this.dataListTaixe = [];
      this.tableLoadingTaixe(false);
    }
  }

  getItem(id: any, sodienthoai: any,datacd:any,datanm:any,diachi:any,thongtinthanhtoan1:any,thongtinthanhtoan2:any) {
    this.searchBiensoxe.rcdkbn = id;
    this.searchTaixe.rcdkbn = sodienthoai;
    this.getDataListBiensoxe();
    this.getDataListTaixe();
    this.idnguonxe = datacd;
    this.tennguonxe = datanm;
    this.sodienthoainguonxe = sodienthoai;
    this.diachinguonxe = diachi;
    this.thongtinthanhtoan1 = thongtinthanhtoan1;
    this.thongtinthanhtoan2 = thongtinthanhtoan2;
  }

  tableChangeDectctionTaixe(): void {
    this.dataListTaixe = [...this.dataListTaixe];
    this.cdf.detectChanges();
  }

  changePageSizeTaixe(e: number): void {
    this.tableConfigTaixe.pageSize = e;
  }

  reloadTableTaixe(): void {
    this.message.info('Làm mới thành công');
    this.getDataListTaixe();
  }

  tableLoadingTaixe(isLoading: boolean): void {
    this.tableConfigTaixe.loading = isLoading;
    this.tableChangeDectctionTaixe();
  }

  selectedCheckedTaixe(e: any[]): void {
    this.checkedCashArrayTaixe = [...e];
  }

  private initTableTaixe(): void {
    this.tableConfigTaixe = {
      showCheckbox: false,
      headers: [
        {
          title: 'Tên Tài xế',
          field: 'datacd',
          width: 200
        },
        {
          title: 'Số điện thoại',
          width: 300,
          field: 'datanm'
        },
        {
          title: 'Vận hành',
          tdTemplate: this.operationTxTpl,
          width: 280,
          fixed: true,
          fixedDir: 'right'
        }
      ],
      total: 0,
      loading: true,
      pageSize: 10,
      pageIndex: 1
    }
  }

  edittx(id: any){

  }

  deltx(id: any){
    
  }

  //=========================================================================================

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

  addEditData(param: Nguonxe, methodName: 'postCreate' | 'postUpdate'): void {
    this.dataService[methodName](param)
      .pipe(
        finalize(() => {
          this.tableLoading(false);
        })
      )
      .subscribe(() => {
        this.message.info('Cập nhật thành công');
        this.getDataList();
      });
  }

  edit(id: any) {
    this.dataService.postDetail({id:id}).subscribe(res => {
       this.modalService.show({nzTitle: 'Cập Nhật'}, res).subscribe(({modalValue, status}) => {
          if(status === ModalBtnStatus.Cancel) {
             return;
          }
          modalValue.id = id;
          this.tableLoading(true);
          this.addEditData(modalValue,'postUpdate');
       })    
    })
  }

  del(id: any) {
    this.modalSrv.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa không ?',
      nzContent: 'Không thể khôi phục sau khi xóa',
      nzOnOk: () => {
        this.tableLoading(true);
        this.dataService.postDelete({id:id}).subscribe(
          () => {
            if (this.dataList.length === 1) {
              this.tableConfig.pageIndex--;
            }
            this.getDataList();
          },
          error => this.tableLoading(false)
        )
      }
    });
  }

  addXe(id: any) {
    let req = {
      "datacd": "Biển số xe",
      "datanm": "Biển số xe hiển thị",
      "datarnm": "Biển số xe dự phòng",
    }
    this.tmt050modalService.show({nzTitle: " Thêm mới xe"},req).subscribe(
      res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        res.modalValue.rcdkbn = id;
        res.modalValue.mode = "KHAC";
        this.spin00901Service.create(res.modalValue)
        .subscribe(data => {
          if(data['acknowledged'] == true) {
            this.message.success("Thêm thành công !")
          } else {
            this.modalSrv.success({nzTitle: "Thêm Thất bại vùi lòng liên hệ Người phát triển !"});
          }
        })

      }
    )
  }

  addTaixe(id: any) {
    let req = {
      "datacd": "Tên tài xế",
      "datanm": "Số điện thoại",
      "datarnm": "Số điện thoại dự phòng",
    }
    this.tmt050modalService.show({nzTitle: " Thêm mới Tài xế"},req).subscribe(
      res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        res.modalValue.rcdkbn = id;
        res.modalValue.mode = "KHAC";
        this.spin00901Service.create(res.modalValue)
        .subscribe(data => {
          if(data['acknowledged'] == true) {
            this.message.success("Thêm thành công !")
          } else {
            this.modalSrv.success({nzTitle: "Thêm Thất bại vùi lòng liên hệ Người phát triển !"});
          }
        })

      }
    )
  }

  override ngOnInit(): void {
    this.initTable();
    this.initTableTaixe();
    this.initTableBiensoxe();
  }

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: false,
      headers: [
        {
          title: 'ID nguồn xe',
          field: 'datacd',
          width: 150,
          tdTemplate: this.linkTpl
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
          width: 380,
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
