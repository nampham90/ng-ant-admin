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
import { SubwindowXeService } from '@app/widget/modal/subwindowxe/subwindow-xe.service';
import { ModalBtnStatus } from '@app/widget/base-modal';
import { SubwindowTaixeService } from '@app/widget/modal/subwindowtaixe/subwindow-taixe.service';
import { Chuyen } from '@app/core/model/chuyen.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { SearchCommonVO } from '@app/core/services/types';
import { ChuyenService } from '@app/core/services/http/chuyen/chuyen.service';
import { ChuyendtoService } from '@app/core/services/http/chuyen/chuyendto.service';
import { finalize } from 'rxjs';
import { ChiPhiDVTN } from '@app/core/model/chiphidichvuthuengoai.model';
import { Spin00301subcpdvtn } from '@app/widget/modal/trongkho/spin00301subcpdvtn/spin00301subcpdvtn.model';
import { Spin00301subcpdvtnService } from '@app/widget/modal/trongkho/spin00301subcpdvtn/spin00301subcpdvtn.service';
import { ChiphichuyenService } from '@app/core/services/http/chiphichuyen/chiphichuyen.service';
import { SubwindowChiphiService } from '@app/widget/modal/subwindowchiphi/subwindow-chiphi.service';
interface SearchParam {
  ngaybatdau: string | null;
  ngayketthuc: string | null;
  biensoxe: string;
  idtai: string;
  idphu: string;
  mode: string;
}

@Component({
  selector: 'app-sprp00701',
  templateUrl: './sprp00701.component.html',
  styleUrls: ['./sprp00701.component.less']
})
export class Sprp00701Component extends BaseComponent implements OnInit {

  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '',
    breadcrumb: ['', '', '']
  };
  searchParam: Partial<SearchParam> = {};
  dateFormat = Const.dateFormat;
  tableConfig!: MyTableConfig;
  dataList: Chuyen[] = [];
  checkedCashArray: any[] = [];
  ActionCode = ActionCode;

  biensoxenm = "";
  stockbsx = "";
  tainm = "";
  stocktai = "";
  phunm = "";
  stockphu = "";

  tongdoanhthu = 0;
  tongchiphi = 0;
  tongchiphidichvu = 0;
  tongloinhuan = 0;

  @ViewChild('soodtTpl', { static: true }) soodtTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('Tlbiensoxe', { static: true }) Tlbiensoxe!: TemplateRef<NzSafeAny>;
  @ViewChild('Tltentai', { static: true }) Tltentai!: TemplateRef<NzSafeAny>;
  @ViewChild('Tltenphu', { static: true }) Tltenphu!: TemplateRef<NzSafeAny>;
  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('tienduatruocTpl', { static: true }) tienduatruocTpl!: TemplateRef<NzSafeAny>;
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

  // sub table
  @ViewChild('tenkhachhangTpl', { static: true }) tenkhachhangTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('tenhangTpl', { static: true }) tenhangTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('tiencuocTpl', { static: true }) tiencuocTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('htttTpl', { static: true }) htttTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('soidTpl', { static: true }) soidTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('tienthuengoaiTpl', { static: true }) tienthuengoaiTpl!: TemplateRef<NzSafeAny>;

  
  override fnInit() {
    this.ngaybatdau = this.getFirstDayOfMonth();
    this.ngayketthuc = this.getLastDayOfMonth();
    this.pageHeaderInfo = {
      title: this.formItemNm[3],
      breadcrumb: [this.formItemNm[1], this.formItemNm[2],this.formItemNm[3]],
      desc: ''
    };

    this.initTable();
  }
  override destroy() {
    
  }

  override DisplayScreenID: UrlDisplayId = UrlDisplayId.sprp00701;

  constructor(
    protected override webService: WebserviceService,
    protected override router: Router,
    protected override cdf :  ChangeDetectorRef,
    protected override  datePipe : DatePipe,
    protected override tabService: TabService,
    protected override modalVideoyoutube: VideoyoutubeService,
    private modalService: SubwindowXeService,
    private modalTaixeService: SubwindowTaixeService,
    public message: NzMessageService,
    private modalSrv: NzModalService,
    private dataService: ChuyenService,
    private chuyenDtoService : ChuyendtoService,
    private spin00301subcpdvtnService: Spin00301subcpdvtnService,
    private cpcService: ChiphichuyenService,
    private modalChiphiService: SubwindowChiphiService,

  ) { 
    super(webService,router,cdf,datePipe,tabService,modalVideoyoutube);
  }

  searchBiensoxeClick() {
    this.modalService.show({ nzTitle: 'Danh Sách Xe' },{showcomfirm:false}).subscribe(
      res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        const param = { ...res.modalValue };
        this.searchParam.biensoxe=param['biensoxe'];
        this.stockbsx = param['biensoxe'];
        this.biensoxenm = param['tenxegoinho'];
      },
    );
  }

  fnFocusOutBiensoxe() {
    if(this.searchParam.biensoxe != this.stockbsx) {
      this.biensoxenm = "";
    }
  }

  fnFocusOutTaixe() {
    if(this.searchParam.idtai != this.stocktai) {
      this.tainm = "";
    }
  }

  searchTaixeClick() {
    this.modalTaixeService.show({ nzTitle: 'Danh Sách Tài Xế' },{showcomfirm:false}).subscribe(
      res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        const param = { ...res.modalValue };
        this.searchParam.idtai=param['id'];
        this.stocktai = param['id'];
        this.tainm = param['name'];
      },
    );
  }

  fnFocusOutPhuxe() {
    if(this.searchParam.idphu != this.stockphu) {
      this.phunm = "";
    }
  }

  searchPhuxeClick() {
    this.modalTaixeService.show({ nzTitle: 'Danh Sách Tài Xế' },{showcomfirm:false}).subscribe(
      res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        const param = { ...res.modalValue };
        this.searchParam.idphu=param['id'];
        this.stockphu = param['id'];
        this.phunm = param['name'];
      },
    );
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

  showChiphi(id: string) {
    let req = {
      id: id
    }
    this.cpcService.getlists(req).pipe().subscribe(res => {
      this.modalChiphiService.show({ nzTitle: 'Danh sách chi phí' }, {listcp:res,status:5,showcomfirm:false}).subscribe(({ modalValue, status }) => {
        if (status === ModalBtnStatus.Cancel) {
          return;
        }
      });
    })
  }

  getDataList(e?: NzTableQueryParams) {
    this.tableLoading(true);
    this.searchParam.mode = "REPORT";
    this.searchParam.ngaybatdau = this.formatDate(this.ngaybatdau);
    this.searchParam.ngayketthuc = this.formatDate(this.ngayketthuc);
    const params: SearchCommonVO<any> = {
      pageSize: this.tableConfig.pageSize!,
      pageNum: e?.pageIndex || this.tableConfig.pageIndex!,
      filters: this.searchParam
    };
    this.dataService.getChuyens(params)
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
      if(this.dataList.length > 0) {
        this.thongke(this.dataList);
      } else {
        this.tongchiphi = 0;
        this.tongchiphidichvu = 0;
        this.tongdoanhthu = 0;
        this.tongloinhuan = 0;
      }
      
    })
  }

  thongke(datalist: Chuyen[]) {
    let cpdvtn = 0;
    for(let element of datalist) {
      this.tongdoanhthu = this.tongdoanhthu + element.tongcuoc!
      this.tongchiphi = this.tongchiphi + element.tongchiphi!;
      for(let lst of element.dataListChild!) {
        cpdvtn = cpdvtn + (lst.cpdvtncd!.sotiennhaphang == undefined? 0 : lst.cpdvtncd!.sotiennhaphang)
               + (lst.cpdvtncd!.sotientrahang == undefined? 0 : lst.cpdvtncd!.sotientrahang)
               + (lst.cpdvtncd!.sotienbocxep == undefined? 0 : lst.cpdvtncd!.sotienbocxep)
               + (lst.cpdvtncd!.sotienxecau == undefined? 0 : lst.cpdvtncd!.sotienxecau)
      }
      this.tongchiphidichvu = this.tongchiphidichvu + cpdvtn;
    }
    this.tongloinhuan = this.tongdoanhthu - (this.tongchiphi + this.tongchiphidichvu);
  }

  resetForm() {
     this.searchParam = {};
     this.ngaybatdau = this.getFirstDayOfMonth();
     this.ngayketthuc = this.getLastDayOfMonth();
     this.phunm = "";
     this.tainm = "";
     this.biensoxenm = "";
     this.getDataList();
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

  selectedChecked(e: Chuyen[]): void {
    this.checkedCashArray = [...e];
  }

  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
  }

  copy(soodt: any) {
    return `${soodt}`;
  }

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: false,
      showExpand: true,
      headers: [
        {
          title: 'Số ODT',
          width: 250,
          field: 'soodt',
          tdTemplate: this.soodtTpl
        },
        {
          title: 'Trạng thái chuyến hàng',
          width: 250,
          field: 'trangthai',
          tdTemplate: this.trangthaiTpl
        },
        {
          title: 'Ngày khởi hành',
          field: 'ngaydi',
          width: 180,
          pipe: "date: dd/MM/YYYY HH:mm"
        },
        {
          title: 'Ngày về',
          width: 180,
          field: 'ngayve',
          pipe: "date: dd/MM/YYYY HH:mm"
        },
        {
          title: 'Tài Chính',
          width: 170,
          field: 'idtai',
          tdTemplate: this.Tltentai
        },
        {
          title: 'Tài Phụ',
          width: 170,
          field: 'idphu',
          tdTemplate: this.Tltenphu
        },
        {
          title: 'Biển số xe',
          width: 200,
          field: 'biensoxe',
          tdTemplate: this.Tlbiensoxe
        },
        {
          title: 'Tiền đưa trước',
          width: 200,
          field: 'tienxe',
          tdTemplate: this.tienduatruocTpl
        },
        {
          title: 'Điểm đi - điểm đến',
          width: 150,
          field: 'changduong'
        },
        {
          title: 'Hành động',
          tdTemplate: this.operationTpl,
          width: 300,
          fixed: true,
          fixedDir: 'right'
        }
      ],
      headersChild: [
        {
          title: "Số ID",
          field: "soID",
          width: 200,
          tdTemplate: this.soidTpl
        },
        {
          title: 'Tên Khách Hàng',
          width: 170,
          field: 'tenkhachhang',
          tdTemplate: this.tenkhachhangTpl
        },
        {
          title: 'Tên hàng',
          width: 450,
          field: 'noidungmathang',
          tdTemplate: this.tenhangTpl
        },
        {
          title: 'Số lượng',
          field: 'soluong',
          width: 80,
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
          title: 'Tiền cước',
          width: 100,
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
          title: 'Địa điểm bóc hàng',
          width: 300,
          field: 'diadiembochang',
        },
        {
          title: 'Hình thức thanh toán',
          width: 250,
          field: 'hinhthucthanhtoan',
          tdTemplate: this.htttTpl
        },
        {
          title: 'Tên người nhận',
          width: 250,
          field: 'tennguoinhan'
        },
        {
          title: 'SDT người nhận',
          width: 150,
          field: 'sdtnguoinhan'
        },
        {
          title: 'Địa chỉ người nhận',
          width: 350,
          field: 'diachinguoinhan'
        },
        {
          title: 'Ghi chú',
          width: 450,
          field: 'ghichu'
        }
      ],
      total: 0,
      loading: true,
      pageSize: 10,
      pageIndex: 1
    };
  }

}
