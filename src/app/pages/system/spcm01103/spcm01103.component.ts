import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { UrlDisplayId } from '@app/common/UrlDisplay';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { TabService } from '@app/core/services/common/tab.service';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import { VideoyoutubeService } from '@app/widget/modal/subwindowvideoyoutube/videoyoutube.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Spin00901Service } from '@app/core/services/http/trongkho/spin00901.service';
import { Tmt050modalService } from '@app/widget/biz-widget/system/tmt050modal/tmt050modal.service';
import * as Const from "src/app/common/const";
import { ActionCode } from '@app/config/actionCode';
import { MyTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { SearchCommonVO } from '@app/core/services/types';
import { finalize } from 'rxjs';
import { Spin00901Model } from '@app/core/model/trongkho/spin00901.model';
import { ModalBtnStatus } from '@app/widget/base-modal';
import { Spcm01103ModalService } from '@app/widget/biz-widget/system/spcm01103-modal/spcm01103-modal.service';
import { Dichvu } from '@app/core/model/dichvuthuengoai.model';
import { Tmt060DichvuthuengoaiService } from '@app/core/services/http/system/tmt060-dichvuthuengoai.service';

interface SearchParam {
  datacd: string;
  rcdkbn: string;
}

@Component({
  selector: 'app-spcm01103',
  templateUrl: './spcm01103.component.html',
  styleUrls: ['./spcm01103.component.less']
})
export class Spcm01103Component extends BaseComponent implements OnInit {

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

  tableConfigChild!: MyTableConfig;
  dataListChild: any[] = [];
  checkedCashArrayChild: any[] = [];
  showchildTable = false;

  titleTablechild = "";
  idTablechild = "";

  dichvu!: Dichvu


  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('operationchildTpl', { static: true }) operationchildTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('linkTpl', { static: true }) linkTpl!: TemplateRef<NzSafeAny>;

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


  override DisplayScreenID: UrlDisplayId = UrlDisplayId.spcm01103;

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
    private tmt060Service: Tmt060DichvuthuengoaiService,
    private tmt050modalService: Tmt050modalService,
    private spcm01103ModalService: Spcm01103ModalService
  ) {
    super(webService,router,cdf,datePipe,tabService,modalVideoyoutube);
  }

  add() {
    let req = {
      "datacd": "Tên dịch vụ thuê ngoài",
      "datanm": "Tên dịch vụ thuê ngoài hiển thị",
      "datarnm": "Tên dịch vụ thuê ngoài dự phòng",
    }

    this.tmt050modalService.show({nzTitle: " Thêm mới dịch vụ thuê ngoài"},req).subscribe(
      res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        res.modalValue.rcdkbn = Const.tmt050lstdichvuthuengoai;
        res.modalValue.mode = "KHAC";
        this.addEditData(res.modalValue, 'create');
      }
    )
  }

  allDel() {

  }

  edit(id:any) {
    this.dataService.Detail({id:id})
    .pipe()
    .subscribe(res => {
      let req = {
        "datacd": "Tên dịch vụ thuê ngoài",
        "datanm": "Tên dịch vụ thuê ngoài hiển thị",
        "datarnm": "Tên dịch vụ thuê ngoài dự phòng",
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
          this.dataService.delete({id:id}).pipe()
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

  showChildTable(id: any,datacd:string) {
     this.titleTablechild = datacd;
     this.idTablechild = id;
     this.initTableChild();
     this.showchildTable = true;
     
  }

  getDataList(e?: NzTableQueryParams) {
    this.searchParam.rcdkbn = Const.tmt050lstdichvuthuengoai;
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
    this.searchParam.rcdkbn = Const.tmt050lstdichvuthuengoai;
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
          tdTemplate: this.linkTpl,
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

  addChild() {
    this.spcm01103ModalService.show({nzTitle: "Thêm mới dịch vụ "+this.titleTablechild}).subscribe(res => {
      if (!res || res.status === ModalBtnStatus.Cancel) {
        return;
      }
      res.modalValue.loaidichvu = this.idTablechild;
      console.log(res.modalValue);
      //this.addEditDataChild(res.modalValue,"add");

    })
  }

  editChild(id: any) {

  }

  delChild(id: any) {

  }

  getDataListChild(e?: NzTableQueryParams) {

  }

  addEditDataChild(param: Dichvu, methodName: 'update' | 'add'): void {
    this.tmt060Service[methodName](param)
    .pipe(
      finalize(() => {
        this.tableLoading(false);
      })
    )
    .subscribe(() => {
      this.getDataListChild();
    }); 
  }

  reloadTableChild() {
    this.message.info('Đã được làm mới');
    this.getDataListChild();
  }

  tableChangeDectctionChild(): void {
    this.dataListChild = [...this.dataListChild];
    this.cdf.detectChanges();
  }

  tableLoadingChild(isLoading: boolean): void {
    this.tableConfigChild.loading = isLoading;
    this.tableChangeDectction();
  }

  selectedCheckedChild(e: any[]): void {
    this.checkedCashArrayChild = [...e];
  }

  changePageSizeChild(e: number): void {
    this.tableConfigChild.pageSize = e;
  }

  private initTableChild(): void {
    this.tableConfigChild = {
      showCheckbox: false,
      headers: [
        {
          title: "Tên nhà cung cấp",
          field: 'tennhacungcap',
          width: 180,
        },
        {
          title: "Địa chỉ",
          width: 280,
          field: 'diachi',
        },
        {
          title: "Điện thoại",
          width: 160,
          field: 'sodienthoai',
        },
        {
          title: "Vận hàng",
          tdTemplate: this.operationchildTpl,
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
