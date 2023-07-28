import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UrlDisplayId } from '@app/common/UrlDisplay';
import { ActionCode } from '@app/config/actionCode';
import { TabService } from '@app/core/services/common/tab.service';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import { KhachhangDtoService } from '@app/core/services/http/khachhang/khachhang-dto.service';
import { KhachhangService } from '@app/core/services/http/khachhang/khachhang.service';
import { NhatkykhService } from '@app/core/services/http/nhatkykh/nhatkykh.service';
import { OptionsInterface, SearchCommonVO } from '@app/core/services/types';
import { BaseComponent } from '@app/pages/system/base/base.component';
import { MyTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import _ from 'lodash';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, finalize } from 'rxjs';
import * as Const from "src/app/common/const";
import { LayoutPdfService } from '@app/core/services/common/layout-pdf.service';
import { CtchuyenngoaiService } from '@app/core/services/http/chuyenngoai/ctchuyenngoai.service';
import { CommonService } from '@app/core/services/http/common/common.service';
import { VideoyoutubeService } from '@app/widget/modal/subwindowvideoyoutube/videoyoutube.service';

import { Spch00201subupdateTiencuocxenhaService } from '@app/widget/modal/chuyen/spch00201subupdate-tiencuocxenha/spch00201subupdate-tiencuocxenha.service';
import { ModalBtnStatus } from '@app/widget/base-modal';
import { Spch00201Service } from '@app/core/services/http/chuyen/spch00201.service';
import { Spin00251subkhachhangService } from '@app/widget/modal/trongkho/spin00251subkhachhang/spin00251subkhachhang.service';
import { Spkh00201Service } from '@app/core/services/http/khachhang/spkh00201.service';
import { Spkh00201subthanhtoanService } from '@app/widget/modal/khachhang/spkh00201subthanhtoan/spkh00201subthanhtoan.service';
interface SearchParam {
  iduser?: string;
  ngaybatdau: string | null;
  ngayketthuc: string | null;
  trangthai : number; // 0 la no , 1  là trả
}

class showbtnTable {
   btnthanhtoan = false;
}

@Component({
  selector: 'app-spkh00201',
  templateUrl: './spkh00201.component.html',
  styleUrls: ['./spkh00201.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Spkh00201Component extends BaseComponent implements OnInit {

  searchParam: Partial<SearchParam> = {};
  dateFormat = Const.dateFormat;
  tableConfig!: MyTableConfig;
  dataList: any[] = [];
  checkedCashArray: any[] = [];
  ActionCode = ActionCode;
  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('tenhangTpl', { static: true }) tenhangTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('tiencuocTpl', { static: true }) tiencuocTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('soluongTpl', { static: true }) soluongTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('donvitinhTpl', { static: true }) donvitinhTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('trangthaiTpl', { static: true }) trangthaiTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('nguonxeTpl', { static: true }) nguonxeTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('khachhangTpl', { static: true }) khachhangTpl!: TemplateRef<NzSafeAny>;

  fnInit() {
    this.cdf.markForCheck();
  }

  destroy() { }

  DisplayScreenID: UrlDisplayId = UrlDisplayId.spkh00201;
  availableOptions: OptionsInterface[] = [];
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Thanh toán công nợ',
    breadcrumb: ['Home', 'Khách Hàng', 'Thanh toán công nợ']
  };

  constructor(
    protected override webService: WebserviceService,
    protected override router: Router,
    protected override cdf :  ChangeDetectorRef,
    protected override  datePipe : DatePipe,
    protected override modalVideoyoutube: VideoyoutubeService,
    public message: NzMessageService,
    private modalSrv: NzModalService,
    private khdtoService: KhachhangDtoService,
    private dataService: Spkh00201Service,
    private khachhangService : KhachhangService,
    protected override tabService : TabService,
    private pdfService: LayoutPdfService,
    private commonService: CommonService,
    private modalspch00201xenhaService: Spch00201subupdateTiencuocxenhaService,
    private spch00201Service: Spch00201Service,
    private spin00251subkhachhangService: Spin00251subkhachhangService,
    private spkh00201subthanhtoanService: Spkh00201subthanhtoanService
    
  ) {
    super(webService,router,cdf,datePipe,tabService,modalVideoyoutube);
  }

  btnUpdate = false;

  btnshowmodalkh = false;
  btntattoan = false;
  btnthanhtoanmotphan = false;
  btnsearch = false;
  idkhachhang = "";
  tenkhachhang = "";
  stocktenkhachhang = ""
  sdtkhachhang = "";
  diachikhachhang = "";
  sotienno = 0;
  soodc = "";
  changeSotienno($event: any) {this.sotienno = $event; }
  ngaybatdau : any;
  ngayketthuc : any;
  status = '0';
  phanloai = 'Nợ'; // 1 Nợ, 2 đã thanh toán, 3 tất toán
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

  showConfirm = true;
  override ngOnInit(): void {
    // lay ngay giơ mặc chua
    this.initTable();
  }

  getDataList(e?: NzTableQueryParams) {
    this.checkedCashArray = [];
    this.tableLoading(true);
    this.searchParam.ngaybatdau = this.formatDate(this.ngaybatdau);
    this.searchParam.ngayketthuc = this.formatDate(this.ngayketthuc);
    const params: SearchCommonVO<any> = {
      pageSize: this.tableConfig.pageSize!,
      pageNum: e?.pageIndex || this.tableConfig.pageIndex!,
      filters: this.searchParam
    };
    this.dataService.getlists(params)
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
      this.showbtnxuatPdf();
    })
  }

  // 
  showbtnxuatPdf() {
    if(this.sotienno > 0 && this.checkedCashArray.length > 0) {
      this.showConfirm = true;
    } else {
      this.showConfirm = false;

    }
  }


  // thanh toán một đơn hàng
  thanhtoan() {
    this.spkh00201subthanhtoanService.show({nzTitle: "Thanh toán đơn hàng"}).subscribe(res => {
      if (!res || res.status === ModalBtnStatus.Cancel) {
        return;
      }
      const param = { ...res.modalValue };
      switch(param['type']) {
        case 'A' : this.thanhtoanhoadon(param['sohdttcnkh']); break;
        case 'B' : this.huythanhtoan(param['sohdttcnkh']); break;
        case 'C' : this.phathanhlai(param['sohdttcnkh']); break;
        case 'D' : this.huyphathanh(param['sohdttcnkh']); break;
      }
    })

  }

  // thanh toan công nợ khách hàng
  thanhtoanhoadon(sohdttcnkh: string): void {
    this.dataService.thanhtoanhoadon(sohdttcnkh)
    .subscribe(res => {
      if(res === 1) {
       return  this.modalSrv.success({nzTitle: "Thanh toán thành công !"})
      }
      return this.modalSrv.error({nzTitle: "Số hóa đơn không hợp lệ !", nzContent: "Vùi lòng liên lệ bộ phận kỷ thuất để hổ trợ"})
    })
  }

  // hủy thanh toán cộng nợ khách hàng
  huythanhtoan(sohdttcnkh: string): void {
    this.dataService.huythanhtoan(sohdttcnkh)
    .subscribe(res => {
      if(res === 1) {
        return  this.modalSrv.success({nzTitle: "Hủy thanh toán thành công !"})
      }
      return this.modalSrv.error({nzTitle: "Số hóa đơn không hợp lệ !", nzContent: "Vùi lòng liên lệ bộ phận kỷ thuất để hổ trợ"})
    })
  }

  // phát hành lại cộng nợ
  phathanhlai(sohdttcnkh: string): void {
    this.dataService.phathanhlai(sohdttcnkh)
    .subscribe(res => {
      if(res) {
        // goi hàm phat hành lại
        this.fnphathanhdonhang(res);
        return  this.modalSrv.success({nzTitle: "Phát hành lại thành công !"})
      }
      return this.modalSrv.error({nzTitle: "Số hóa đơn không hợp lệ !", nzContent: "Vùi lòng liên lệ bộ phận kỷ thuất để hổ trợ"})
    })
  }

  // hủy phat hành lại công nợ
  huyphathanh(sohdttcnkh: string): void {
    this.dataService.huyphathanh(sohdttcnkh)
    .subscribe(res => {
      if(res === 1) {
        return  this.modalSrv.success({nzTitle: "Hủy phát hành thành công !"})
      }
      return this.modalSrv.error({nzTitle: "Số hóa đơn không hợp lệ !", nzContent: "Vùi lòng liên lệ bộ phận kỷ thuất để hổ trợ"})
    })
  }

  // cập nhật tiền cược
  capnhat(soID: string, tiencuoc: number): void {
      this.modalspch00201xenhaService.show({nzTitle: "Cập nhật tiền cước"},{tiencuoc:tiencuoc}).subscribe(
        res => {
          if (!res || res.status === ModalBtnStatus.Cancel) {
            return;
          }
          const param = { ...res.modalValue };
          if(param['tiencuoc'] == tiencuoc) {
            this.modalSrv.info({nzTitle: "Bạn chưa thay đổi tiền cước !"})
            return;
          } 

          let req = {
            "soID": soID,
            "tiencuocupdate": param['tiencuoc'],
            "lydo": param['lydo']
          }
          this.spch00201Service.updateTiencuocSoID(req).subscribe(res=> {
            if(res == 1) {
              this.message.success("Thực hiện thành công !");
              this.getDataList();
            }
          })
        }
      )
  }

  // get detail khach hang
  getDetailKhachhang() {
      // get detail khach hang
      this.khachhangService.getDetail(this.khdtoService.id)
      .pipe()
      .subscribe(res => {
        this.sotienno = res.sotienno;
        this.khdtoService.sotienno = res.sotienno;
      })
  }


  resetForm() {
    this.searchParam = {};
    this.tenkhachhang = "";
  }

  fnFocusOutKhachhang() {
    if(this.searchParam.iduser != this.stocktenkhachhang) {
      this.tenkhachhang = "";
    }
  }

  searchKhachhangClick() {
    this.spin00251subkhachhangService.show({nzTitle: "Danh sách khách hàng"},{showcomfirm:false}).subscribe(
      res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        const param = { ...res.modalValue };
        this.searchParam.iduser = param['id'];
        this.idkhachhang = param['id'];
        this.stocktenkhachhang = param['id'];
        this.tenkhachhang = param['name'];
        this.sdtkhachhang = param['sodienthoai'];
        this.diachikhachhang = param['diachi']
        this.commonService.tongnoUser({iduser:param['id']}).subscribe(res=>{
           this.sotienno = res;
           this.cdf.detectChanges();
           this.getDataList();
        })
      }
    )
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

  selectedChecked(e: any): void {
    this.checkedCashArray = [...e];
    this.showbtnxuatPdf();
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
          width: 200,
          field: 'soID',
        },
        {
          title: 'Tên hàng',
          width: 450,
          field: 'tenhang',
        },
        {
          title: 'Tiền cước',
          width: 120,
          field: 'tiencuoc',
          tdTemplate: this.tiencuocTpl
        },
        {
          title: 'Trang Thái',
          width: 180,
          field: 'trangthai',
        },
        {
          title: 'Số lượng',
          width: 120,
          field: 'soluong',
        },
        {
          title: 'Số lượng thưc tế',
          width: 150,
          field: 'soluongthucte',
        },
        {
          title: 'Khối lượng',
          width: 80,
          field: 'khoiluong',
        },
        {
          title: 'Trọng lượng',
          width: 80,
          field: 'trongluong',
        },
        {
          title: 'Đơn vị tính',
          width: 120,
          field: 'donvitinh',
        },
        {
          title: 'Ngày nhập thực tế',
          field: 'ngaynhapthucte',
          width: 150,
          pipe: 'date:yyyy-MM-dd HH:mm',
        },
        {
          title: 'Ghi chú',
          width: 150,
          field: 'ghichu',
        },
        {
          title: 'Hành động',
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

  async fnphathanhdonhang(res: NzSafeAny)  {
    let data: NzSafeAny[] = [];
    for(let element of res['lstData']) {
      let item = [
        this.formatDate(element['ngaynhapthucte']),
        element['tenhang'],
        this.displayVND(element['tiencuoc']),
        element['soluong'],
        element['khoiluong'],
        element['trongluong'],
        element['nguoiphathanh']
      ]
      data.push(item);
    }

    let title = "Công nợ " + res['header'].tenkhachhang;
    let header= [['Ngày nhập hàng','Tên Hàng', "Tiền cước", "Số lượng", "Trọng lượng", "Khối lượng", "Người phát hành"]];
    this.pdfService.clearHeader();
    let headerlayout = Const.headerLayout;
    headerlayout[0]['field'] = 'Kính gửi:';
    headerlayout[0]['value'] = res['header'].tenkhachhang;
    headerlayout[1]['field'] = 'Số điện thoại:';
    headerlayout[1]['value'] = res['header'].sdtkhachhang;
    headerlayout[2]['field'] = 'Địa chỉ:';
    headerlayout[2]['value'] = res['header'].diachi;
    headerlayout[3]['field'] = 'Tổng tiền thanh toán:';
    headerlayout[3]['value'] =  this.displayVND(res['header'].tongcuoc);
    headerlayout[4]['field'] = 'Số HDTTCNKH:';
    headerlayout[4]['value'] =  this.displayOD(res['header'].sohdttcnkh);
    await this.pdfService.exportPDF(header,headerlayout,data,title,this.getDate(),"Bên thanh toán","Bên Vận Chuyển",res['header'].sohdttcnkh);

  }

  // data exprot pdf
  generateData() {
    let data : any[] = [];
    for(let element of this.dataList) {
      if(element['_checked'] == true) {
        let item = [
          this.formatDate(element['ngaynhapthucte']),
          element['tenhang'],
          this.displayVND(element['tiencuoc']),
          element['soluong'],
          element['khoiluong'],
          element['trongluong'],
          element['nguoiphathanh']['name']
        ]
        data.push(item);
        
      }
    }
    return data;
  }

  //xuất file pdf gửi cho khach hang
  xuatpdf() {
    if(this.generateData().length > 0) {
      // get odc 
      this.commonService.getSoHDTTCNKH().pipe()
      .subscribe(async res => {
        let title = "Công nợ " + this.tenkhachhang;
        let header= [['Ngày nhập hàng','Tên Hàng', "Tiền cước", "Số lượng", "Trọng lượng", "Khối lượng", "Người phát hành"]];
        this.pdfService.clearHeader();
        let headerlayout = Const.headerLayout;
        headerlayout[0]['field'] = 'Kính gửi:';
        headerlayout[0]['value'] = this.tenkhachhang;
        headerlayout[1]['field'] = 'Số điện thoại:';
        headerlayout[1]['value'] = this.sdtkhachhang;
        headerlayout[2]['field'] = 'Địa chỉ:';
        headerlayout[2]['value'] = this.diachikhachhang;
        headerlayout[3]['field'] = 'Tổng tiền thanh toán:';
        headerlayout[3]['value'] =  this.displayVND(this.fnTongCuoc());
        headerlayout[4]['field'] = 'Số HDTTCNKH:';
        headerlayout[4]['value'] =  this.displayOD(res);
        await this.pdfService.exportPDF(header,headerlayout,this.generateData(),title,this.getDate(),"Bên thanh toán","Bên Vận Chuyển",res);
        // update so odc cho các don hàng đã exprot
        let lstsoID = [];
        for(let element of this.checkedCashArray) {
          lstsoID.push(element['soID']);
        }
        let req = {
          lstsoID : lstsoID,
          SoHDTTCNKH : res,
          idkhachhang:this.idkhachhang,
          tongcuoc: this.fnTongCuoc()
        }

        this.dataService.xuatpdf(req)
        .pipe(
          finalize(() => {
            this.tableLoading(false);
          })
        )
        .subscribe(res => {
          console.log(res);
          this.getDataList();
        })
      })
     
    } else {
      this.modalSrv.info({nzTitle: "Vùi chọn ít nhất một đơn hàng để xuất cộng nợ"});
    }

  }

  fnTongCuoc() {
    let tongcuoc = 0;
    for(let element of this.checkedCashArray) {
        tongcuoc = tongcuoc + element['tiencuoc'];
    }
    return tongcuoc;
  }

  fnGetIddonhang(str: string) {
    let strid = str.substring(0, 24);
    return strid;
  }

}
