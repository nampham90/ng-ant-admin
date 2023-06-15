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
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { Spin00801Service } from '@app/core/services/http/trongkho/spin00801.service';
import { Spin00901Service } from '@app/core/services/http/trongkho/spin00901.service';
import { SubcommonsoidService } from '@app/widget/modal/common/subcommonsoid/subcommonsoid.service';
import { Spin00251subkhachhangService } from '@app/widget/modal/trongkho/spin00251subkhachhang/spin00251subkhachhang.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ModalBtnStatus } from '@app/widget/base-modal';
import { SearchCommonVO } from '@app/core/services/types';
import { finalize } from 'rxjs';
import { Spin00301Service } from '@app/core/services/http/trongkho/spin00301.service';
import { Spin00251Service } from '@app/core/services/http/trongkho/spin00251.service';
import { Spin00251dtoService } from '@app/core/services/http/trongkho/spin00251dto/spin00251dto.service';
import { ChiPhiDVTN } from '@app/core/model/chiphidichvuthuengoai.model';
import { Spin00301subcpdvtnService } from '@app/widget/modal/trongkho/spin00301subcpdvtn/spin00301subcpdvtn.service';
import { Spin00301subcpdvtn } from '@app/widget/modal/trongkho/spin00301subcpdvtn/spin00301subcpdvtn.model';

interface SearchParam {
  ngaybatdau: string | null;
  ngayketthuc: string | null;
  soID: string;
  makho:string;
  iduser: string;
  status02: number | null;
}
@Component({
  selector: 'app-spin00301',
  templateUrl: './spin00301.component.html',
  styleUrls: ['./spin00301.component.less']
})
export class Spin00301Component extends BaseComponent implements OnInit {

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
  @ViewChild('nguoiguiTpl', { static: true }) nguoiguiTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('tiencuocTpl', { static: true }) tiencuocTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('tienthuengoaiTpl', { static: true }) tienthuengoaiTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('htttTpl', { static: true }) htttTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('soidTpl', { static: true }) soidTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('trangthaiTpl', { static: true }) trangthaiTpl!: TemplateRef<NzSafeAny>;

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

  listKho: any[] = [];

  usernm = "";
  stockuser = "";

  checkOptionStatus = [
    { label: 'Trong kho', value: 0, checked: false },
    { label: 'Vận chuyển', value: 1, checked: false }
  ];
  
  override fnInit() {
    this.pageHeaderInfo = {
      title: this.formItemNm[3],
      breadcrumb: [this.formItemNm[1], this.formItemNm[2],this.formItemNm[3]],
      desc: ''
    };

    this.initTable();
    this.getListKho();
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
    private modalListSoIDService: SubcommonsoidService,
    private spin00901Service: Spin00901Service,
    private spin00251subkhachhangService: Spin00251subkhachhangService,
    private spin00801Service: Spin00801Service,
    private spin00301Service: Spin00301Service,
    private spin00251Service: Spin00251Service,
    private spin00251DtoService: Spin00251dtoService,
    private spin00301subcpdvtnService: Spin00301subcpdvtnService
  ) { 
    super(webService,router,cdf,datePipe,tabService,modalVideoyoutube);
  }

  copy(soID: any) {
    return `${soID}`;
  }

  getItem(soID: any) {
    this.spin00251Service.getPHN({soID:soID})
    .subscribe(res => {
       this.spin00251DtoService.mode = "Tìm kiếm"
       this.spin00251DtoService.initFlg = false;
       this.spin00251DtoService.soID = res['header']['soID'];
       this.spin00251DtoService.iduser = res['header']['iduser']['_id'];
       this.spin00251DtoService.hinhthucthanhtoan =  res['header']['hinhthucthanhtoan'];
       this.spin00251DtoService.usernm = res['header']['iduser']['name'];
       this.spin00251DtoService.ghichu = res['header']['ghichu'];
       this.spin00251DtoService.listsp = res['listsp'];
       this.spin00251DtoService.backurl = Const.rootbase + UrlDisplayId.spin00301
       this.transfer(Const.rootbase + UrlDisplayId.spin00251);
    })
  }

  log(): void {
    if (this.checkOptionStatus.every(item => item.checked)) {
       this.searchParam.status02 = 2;
    } else {
       if(this.checkOptionStatus[0].checked == true) {
         this.searchParam.status02 = 0;
       } else if(this.checkOptionStatus[1].checked == true) {
         this.searchParam.status02 = 1;
       } else {
         this.searchParam.status02 = null;
       }
    }
  }

  getListKho() {
    const params: SearchCommonVO<any> = {
      pageSize: 0,
      pageNum: 0,
      filters: {
        "rcdkbn": "0001"
      }
    };
    this.spin00901Service
      .searchParams(params)
      .pipe(
        finalize(() => {
        })
      )
      .subscribe(res => {
        this.listKho = res;
        this.cdf.markForCheck();
      });
  }

  fnFocusOutUser() {
    if(this.searchParam.iduser != this.stockuser) {
      this.usernm = "";
    }
  }

  searchSoIDClick() {
    this.modalListSoIDService.show({nzTitle: "Danh Sách Số ID"},{showcomfirm:false}).subscribe(
      res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        const param = { ...res.modalValue };
        this.searchParam.soID = param['soID'];
      }
    )

  }

  searchUserClick() {
    this.spin00251subkhachhangService.show({nzTitle: "Danh sách khách hàng"},{showcomfirm:false}).subscribe(
      res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        const param = { ...res.modalValue };
        this.searchParam.iduser = param['id'];
        this.stockuser = param['id'];
        this.usernm = param['name'];

      }
    )
  }

  showTienthuengoai(cpdvtncd: ChiPhiDVTN){
    let req: Spin00301subcpdvtn = {
      showcomfirm:false,
      cpdvtncd: cpdvtncd
    }
    this.spin00301subcpdvtnService.show({nzTitle: "Chi phí dịch vụ thuê ngoài"},req).subscribe(res => {
      if (!res || res.status === ModalBtnStatus.Cancel) {
        return;
      }
    })
  }

  getDataList(e?: NzTableQueryParams) {
    this.tableLoading(true);
    this.searchParam.ngaybatdau = this.formatDate(this.ngaybatdau);
    this.searchParam.ngayketthuc = this.formatDate(this.ngayketthuc);
    const params: SearchCommonVO<any> = {
      pageSize: this.tableConfig.pageSize!,
      pageNum: e?.pageIndex || this.tableConfig.pageIndex!,
      filters: this.searchParam
    };
    this.spin00301Service.search(params)
    .pipe(
      finalize(() => {
        this.tableLoading(false);
      })
    )
    .subscribe(data=>{
      const { list, total, pageNum } = data;
      this.dataList = [...list];
      this.tableConfig.total = total!;
      this.tableConfig.pageIndex = pageNum!;
      this.tableLoading(false);
      this.checkedCashArray = [...this.checkedCashArray];
    })
  }

  resetForm() {
    this.searchParam = {}
    this.usernm = "";

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
      showCheckbox: true,
      headers: [
        {
          title: 'Số ID',
          field: 'soID',
          width: 250,
          tdTemplate: this.soidTpl
        },
        {
          title: "Nội dung đơn hàng",
          width: 150,
          field: 'noidungdonhang',
        },
        {
          title: 'Tên người gửi',
          field: 'iduser',
          width: 220,
          tdTemplate: this.nguoiguiTpl
        },
        {
          title: "Tiền cước",
          width: 120,
          field: 'tiencuoc',
          tdTemplate: this.tiencuocTpl
        },
        {
          title: "Tiền thuê ngoài",
          width: 180,
          field: 'cpdvtncd',
          tdTemplate: this.tienthuengoaiTpl
        },
        {
          title: 'Trạng thái',
          field: 'trangthai',
          width: 220,
          tdTemplate: this.trangthaiTpl
        },
        {
          title: "Ngày nhập",
          width: 180,
          field: 'ngaynhap',
          pipe: "date: dd/MM/YYYY HH:mm"
        },
        {
          title: "Kho",
          width: 150,
          field: 'makho',
        },
        {
          title: "Địa điểm bóc hàng",
          width: 150,
          field: 'diadiembochang',
        },
        {
          title: "Số lượng",
          width: 80,
          field: 'soluong',
        },
        {
          title: 'Trọng lượng',
          field: 'trongluong',
          width: 80,
        },
        {
          title: 'khối lượng',
          field: 'khoiluong',
          width: 80,
        },
        {
          title: "Đơn vị tính",
          width: 150,
          field: 'donvitinh',
        },
        {
          title: "Hinh thức thanh toán",
          width: 150,
          field: 'hinhthucthanhtoan',
          tdTemplate: this.htttTpl
        },
        {
          title: "Tên người nhận",
          width: 150,
          field: 'tennguoinhan',
        },
        {
          title: "SĐT người nhận",
          width: 150,
          field: 'sdtnguoinhan',
        },
        {
          title: "Địa chỉ người nhận",
          width: 150,
          field: 'diachinguoinhan',
        },
        {
          title: "Ghi chú",
          width: 150,
          field: 'ghichu',
        },
        // {
        //   title: "Vận hành",
        //   tdTemplate: this.operationTpl,
        //   width: 250,
        //   fixed: true,
        //   fixedDir: 'right'
        // }
      ],
      total: 0,
      loading: true,
      pageSize: 10,
      pageIndex: 1
    };
  }

}
