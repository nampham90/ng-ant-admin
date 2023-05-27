import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { PageHeaderType } from '@shared/components/page-header/page-header.component';
import { finalize } from 'rxjs/operators';

import { ActionCode } from '@app/config/actionCode';
import { Router } from '@angular/router';
import { MessageService } from '@core/services/common/message.service';
import { OptionsInterface, SearchCommonVO } from '@core/services/types';
import { MyTableConfig } from '@shared/components/ant-table/ant-table.component';
import { MapKeyType, MapPipe, MapSet } from '@shared/pipes/map.pipe';
import { ModalBtnStatus } from '@widget/base-modal';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { DatascService, DataScObj} from '@services/system/datasc.service'
import { DatascModalService } from '@app/widget/biz-widget/system/datasc-modal/datasc-modal.service';
import { WebserviceService } from '../../../core/services/common/webservice.service';
import * as Const from 'src/app/common/const';
interface SearchParam {
  title1: string;
  idmenu: string;
}
@Component({
  selector: 'app-datasc',
  templateUrl: './datasc.component.html',
  styleUrls: ['./datasc.component.less']
})
export class DatascComponent implements OnInit {
  @ViewChild('availableFlag', { static: true }) availableFlag!: TemplateRef<NzSafeAny>;
  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<any>;
  searchParam: Partial<SearchParam> = {};

  tableConfig!: MyTableConfig;
  dataList: DataScObj[] = [];
  checkedCashArray: DataScObj[] = [];
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Quản lý dữ liệu SC',
    breadcrumb: ['Home', 'Quản lý hệ thống', 'Quản lý dữ liệu màn hình']
  };
  idmenu = "";
  menuName = "";

  ActionCode = ActionCode;

  dataSC!: DataScObj;

  constructor(
    private modalSrv: NzModalService,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService,
    private router: Router,
    public message: NzMessageService,
    private dataService: DatascService,
    private modalService : DatascModalService,
    private webService: WebserviceService
  ) { }

  ngOnInit(): void {
    this.initTable();
  }

  searchMenutDatasc(idmenu: any) {
     this.idmenu = idmenu;
     this.searchParam.idmenu = idmenu;
     this.getDataList();
     this.getNameMenu(this.idmenu);
  }

  getDataList(e?: NzTableQueryParams) {
    this.tableConfig.loading = true;
    const params: SearchCommonVO<any> = {
      pageSize: this.tableConfig.pageSize!,
      pageNum: e?.pageIndex || this.tableConfig.pageIndex!,
      filters: this.searchParam
    };
    this.dataService.getDataSc(params)
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
    this.cdr.detectChanges();
  }

  reloadTable(): void {
    this.message.info('Làm mới thành công');
    this.getDataList();
  }
  
  selectedChecked(e: DataScObj[]): void {
    this.checkedCashArray = [...e];
  }
  changePageSize($event: any) {}


  resetForm() {
    this.searchParam = {};
    this.getDataList();
  }

  edit(id:any) {
    this.dataService.detailDatasc(id).subscribe(res => {
      if(res) {
        this.dataSC = res;
        this.modalService.show({nzTitle: "Cập nhật"},this.dataSC).subscribe(({ modalValue, status })=> {
          if (status === ModalBtnStatus.Cancel) {
            return;
          }
          modalValue.id = id;
          this.tableLoading(true);
          this.addEditData(modalValue,'editDatasc');
        })
      }
    })
  }

  del(id:any) {
    this.modalSrv.confirm(
      {
        nzTitle: "Bạn có chắc chăn muốn xóa không ?",
        nzContent : "Nhấn OK để tiếp tục !",
        nzOnOk: () => {
          this.tableLoading(true);
          this.dataService.delDatasc(id).subscribe(res => {
            console.log(res);
            this.getDataList();
         })
        }
      }
    )
  }

  getNameMenu(id: string) {
    this.webService.PostCallWs(Const.Ant100PostDetailMenu, {menuId: id}, (response) => {
       this.menuName = response.menuName;
       this.message.info("Bạn vừa chọn Menu: " + response.menuName);
    })
  }

  add(idmenu: string){
     if(idmenu === "") {
       this.message.warning("Bạn chưa chọn menu nào để thêm dữ liệu !")
     }else {
      this.modalService.show({ nzTitle: `Thêm Mới dữ liệu cho Menu: ${this.menuName}`},{idmenu:idmenu}).subscribe(
        res => {
          if (!res || res.status === ModalBtnStatus.Cancel) {
            return;
          }
          res.modalValue.idmenu = idmenu;
          this.tableLoading(true);
          this.addEditData(res.modalValue, 'addDatasc');
        },
        error => this.tableLoading(false)
      );
     }
  }

  allDel(){}

  addEditData(param: DataScObj, methodName: 'editDatasc' | 'addDatasc'): void {
    console.log(param);
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

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: true,
      headers: [
        {
          title: 'Tiêu đề 1',
          field: 'title1',
          width: 120
        },
        {
          title: 'Tiêu đề 1',
          field: 'title2',
          width: 120
        },
        {
          title: 'Ngôn ngữ',
          field: 'lang',
          width: 120
        },
        {
          title: 'Vị trí',
          field: 'vitri',
          width: 100
        },
        {
          title: 'Trạng thái',
          width: 150,
          field: 'status',
          tdTemplate: this.availableFlag
        },
        {
          title: 'Cập nhật',
          tdTemplate: this.operationTpl,
          width: 200,
          fixed: true,
          fixedDir: 'right'
        }
      ],
      total: 0,
      loading: false,
      pageSize: 10,
      pageIndex: 1
    };
  }

}
