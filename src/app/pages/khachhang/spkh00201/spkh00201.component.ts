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
import { finalize } from 'rxjs';
import * as Const from "src/app/common/const";
import { LayoutPdfService } from '@app/core/services/common/layout-pdf.service';
import { CtchuyenngoaiService } from '@app/core/services/http/chuyenngoai/ctchuyenngoai.service';
import { CommonService } from '@app/core/services/http/common/common.service';
import { VideoyoutubeService } from '@app/widget/modal/subwindowvideoyoutube/videoyoutube.service';
import { Spch00201subupdateTiencuocxengoaiService } from '@app/widget/modal/chuyen/spch00201subupdate-tiencuocxengoai/spch00201subupdate-tiencuocxengoai.service';
import { Spch00201subupdateTiencuocxenhaService } from '@app/widget/modal/chuyen/spch00201subupdate-tiencuocxenha/spch00201subupdate-tiencuocxenha.service';
import { ModalBtnStatus } from '@app/widget/base-modal';
import { Spch00201Service } from '@app/core/services/http/chuyen/spch00201.service';
import { Spin00251subkhachhangService } from '@app/widget/modal/trongkho/spin00251subkhachhang/spin00251subkhachhang.service';
interface SearchParam {
  iduser?: string;
  ngaybatdau: string | null;
  ngayketthuc: string | null;
  trangthai : any; // 0 la no , 1  là trả
  ghichu: string;
  status05: string;
}

class showbtnTable {
   btnthanhtoan = false;
   btnduyet = false;
   disabledBtnthanhtoan = false;
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
  @ViewChild('noidungdonhangTpl', { static: true }) noidungdonhangTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('sotienTpl', { static: true }) sotienTpl!: TemplateRef<NzSafeAny>;
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
    title: 'Chi tiết công nợ',
    breadcrumb: ['Home', 'Khách Hàng', 'Chi tiết công nợ']
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
    private dataService: NhatkykhService,
    private khachhangService : KhachhangService,
    protected override tabService : TabService,
    private pdfService: LayoutPdfService,
    private ctChuyenngoaiService: CtchuyenngoaiService,
    private commonService: CommonService,
    private modalspch00201xenhaService: Spch00201subupdateTiencuocxenhaService,
    private modalspch00201xengoaiService: Spch00201subupdateTiencuocxengoaiService,
    private spch00201Service: Spch00201Service,
    private spin00251subkhachhangService: Spin00251subkhachhangService,
    
  ) {
    super(webService,router,cdf,datePipe,tabService,modalVideoyoutube);
  }

  btnUpdate = false;

  btnshowmodalkh = false;
  btntattoan = false;
  btnthanhtoanmotphan = false;
  btnxuatpdf = false;
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
    this.searchParam.ghichu = "Nợ";
    // check khach hàng dto service 
    // if kbnflg = true => show id khach khách , tên khach hang, tong nợ, danh sach chi tiên nợ.
    // if kbnflg = false => show button modal khach hang để  lấy thông tin khách hàng. dataList = [];
    // search từ ngày đến ngày. search chi tiêt trả. chi tiêt nơ. mặt định chu kỳ nợ = 0
    // search chu ký nợ = 1. những nợ đã tất toán.
    // search có ghi chú là tất toán.
    if(this.khdtoService.kbnflg === false) {
       this.ngaybatdau = null;
       this.ngayketthuc = null;
       this.btnshowmodalkh = false;
       this.idkhachhang = "";
       this.tenkhachhang = "";
       this.sdtkhachhang = "";
       this.diachikhachhang = "";
       this.sotienno = 0;
       this.status = '0'
       this.btntattoan = true;
       this.btnthanhtoanmotphan = true;
       this.btnsearch = true;
    } else {
      this.btnshowmodalkh = true;
      this.idkhachhang = this.khdtoService.id;
      this.tenkhachhang = this.khdtoService.name;
      this.sotienno = this.khdtoService.sotienno;
      this.sdtkhachhang = this.khdtoService.dienthoai;
      this.diachikhachhang = this.khdtoService.diachi;
      this.status = '0';
      this.btntattoan = false;
      this.btnthanhtoanmotphan = true;
      this.btnsearch = false;
    }

    // lay ngay giơ mặc chua
    this.initTable();
    this.cdf.markForCheck();
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
    this.dataService.getlists(params)
    .pipe(
      finalize(() => {
        this.tableLoading(false);
      })
    )
    .subscribe(data => {
      const { list, total, pageNum } = data;
      this.dataList = [...list];
      for (let element of this.dataList) {
        let showbtn = this.showBtnTable(element.trangthai);
        element['showBtn'] = showbtn;
        if(element.ghichu == 'Đã thanh toán') {
            element['showBtn'].disabledBtnthanhtoan = true;
        }
      }
      this.tableConfig.total = total!;
      this.tableConfig.pageIndex = pageNum!;
      this.tableLoading(false);
      this.checkedCashArray = [...this.checkedCashArray];
      this.showbtn();
    })
  }

  // 
  showbtn() {
    if(this.dataList.length > 0) {
      this.btntattoan = false;
      this.btnthanhtoanmotphan = false;
    } else {
      this.btntattoan = true;
      this.btnthanhtoanmotphan = true;
    }
    let checkStatus05 = false;
    for(let element of this.dataList) {
      if(element['status05'] != "") {
        checkStatus05 = true;
        break;
      }
    } 
    if(checkStatus05 == true) {
      this.btnxuatpdf = true;
    } else {
      this.btnxuatpdf = false;
    }
  }

  // show btn table
  showBtnTable(trangthai: number): showbtnTable {
    let btn = new showbtnTable();
    switch(trangthai) {
      case 0 : {
        btn.btnthanhtoan = false;
        btn.btnduyet = true;
      }; break;
      case 1 : {
        btn.btnthanhtoan = true;
        btn.btnduyet = false;
      }; break;
      case 2 : {
        btn.btnduyet = true;
        btn.btnthanhtoan = true;
      }
    }
    return btn;
  }

  // thanh toán một đơn hàng
  thanhtoan(pnh: any, status01: any) {
    this.modalSrv.confirm({
      nzTitle: 'Bạn có chắc chắn muốn thanh toán đơn hàng này?',
      nzContent: 'Nhấn OK để hoàn thành',
      nzOnOk: () => {
        let req = {};
        if(pnh) {
          req = {
            "iduser": this.khdtoService.id,
            "idphieunhaphang": pnh['_id']
          }
        } else {
          req = {
            "iduser": this.khdtoService.id,
            "status01": status01
          }
        }

        this.tableConfig.loading = true;
        this.dataService.thanhtoan(req).pipe(
            finalize(() => {
              this.tableLoading(false);
            })
         )
        .subscribe(res => {
            if (res == 1) {
              this.message.info("Thanh Toán thành công !");
              // get detail khach hang
              this.getDetailKhachhang();
            } else {
              this.message.info(" Phát sinh lỗi trong quá trình thanh toán");
            }
            this.getDataList();
            this.tableLoading(false);
        })
      }
    })
  }

  capnhat(idNhatkykh: any,idphieunhaphang: any, status01: any) {
    if(status01 == "") {
      // nhap dơn hàng xe nhà
      // 1. cập nhật "tiencuoc" trong table phieunhaphang
      // 2. cập nhật "tiencuoc" trong table nhatkykh
      // 3. ghi nhật ký hệ thông có thay đổi tiền cước
      this.modalspch00201xenhaService.show({nzTitle: "Cập nhật tiền cước"},{tiencuoc:idphieunhaphang['tiencuoc']}).subscribe(
        res => {
          if (!res || res.status === ModalBtnStatus.Cancel) {
            return;
          }
          const param = { ...res.modalValue };
          if(param['tiencuoc'] == idphieunhaphang['tiencuoc']) {
            this.modalSrv.info({nzTitle: "Bạn chưa thay đổi tiền cước !"})
            return;
          } 

          let req = {
            "soID": idphieunhaphang["soID"],
            "idNhatkykh" : idNhatkykh,
            "tiencuocupdate": param['tiencuoc'],
            "lydo": param['lydo']
          }
          this.spch00201Service.updateTiencuocxenha(req).subscribe(res=> {
            console.log(res);
            if(res == 1) {
              this.message.success("Thực hiện thành công !");
              this.getDataList();
            }
          })
        }
      )
    } else {
      // cập nhật dơn hàng xe ngoai
      // 1. cập nhật "tiencuoc" trong table nhatkykh
      // 2. cập nhật "tiencuoc" trong table chitietchuyenngoai
      this.modalspch00201xenhaService.show({nzTitle: "Cập nhật tiền cước"},{tiencuoc:idphieunhaphang['tiencuoc']}).subscribe(
        res=>{
          if (!res || res.status === ModalBtnStatus.Cancel) {
            return;
          }
          const param = { ...res.modalValue };
          if(param['tiencuoc'] == idphieunhaphang['tiencuoc']) {
            this.modalSrv.info({nzTitle: "Bạn chưa thay đổi tiền cước !"})
            return;
          } 
          let req = {
            "idNhatkykh" : idNhatkykh,
            "idchuyenngoai": idphieunhaphang['idchuyenngoai'], 
            "sdtnguoinhan": idphieunhaphang['sdtnguoinhan'],
            "thongtindonhang": idphieunhaphang['thongtindonhang'],
            "tiencuoc": idphieunhaphang['tiencuoc'],
            "tiencuocupdate":  param['tiencuoc'],
            "lydo": param['lydo']
          }

          this.spch00201Service.updateTiencuocxengoai(req).subscribe(res => {
            console.log(res);
            if(res == 1) {
              this.message.success("Thực hiện thành công !");
              this.getDataList();
            }
          })
        }
      )
    }
  }

  // duyet thanh toán
  duyetthanhtoan(id: string) {

  }

  // tất toán tất cả các đơn hàng
  tattoan() {
    this.modalSrv.confirm({
      nzTitle: 'Bạn có chắc chắn muốn Tất toán?',
      nzContent: 'Nhấn OK để hoàn thành',
      nzOnOk: () => {
        this.tableLoading(true);
        let req = {
          iduser: this.khdtoService.id,
          sotientra: this.khdtoService.sotienno
        }
        this.dataService.tatToan(req).pipe().subscribe(
          () => {
            this.getDetailKhachhang();
            this.getDataList();
            this.resetForm();
          },
          error => this.tableLoading(false)
        );
      }
    })
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

  // thanh toán các đơn hàng được chọn
  thanhtoanmotphan() {
    if(this.searchParam.iduser == "" || this.searchParam.iduser == null || this.searchParam.iduser == undefined) {
      this.modalSrv.info({nzTitle:"Vui lòng Chọn khách hang cần thanh toán !"});
      return;
    }
    if(this.searchParam.status05 == "" || this.searchParam.status05 == null || this.searchParam.status05 == undefined) {
       this.modalSrv.info({nzTitle:"Vui lòng chọn số ODC cần thanh toán và chọn tìm kiếm !"});
       return;
    }
    let listIdPN: NzSafeAny[] = [];
    let checksoodc = false;
    let checkdetailsoodc = false;
    let soodc = "";
    for(let element of this.dataList) {
      if(element['_checked'] == true) {
        if(element['idphieunhaphang']['idchuyen']) {
          listIdPN.push(element['idphieunhaphang']['_id']);
        } else {
          listIdPN.push(element['status01']);
        }
        if(element['status05'] != this.searchParam.status05){
          checkdetailsoodc = true;
          break;
        }
      }
      if(element['status05'] == ""){
        checksoodc = true;
        break;
      } 
    }
    if(listIdPN.length == 0) {
      this.modalSrv.info({nzTitle:"Vùi lòng tích vào đơn hàng !"});
      return;
    }
    if(checkdetailsoodc === true) {
      this.modalSrv.info({nzTitle:"Dử liệu bạn chọn không trùng khớp !"});
      return;
    }
    if (checksoodc === true) {
      this.modalSrv.info({nzTitle:"Vui lòng xuât file pdf để tao Số ODC. mới bắt đầu thanh toán"});
      return;
    } else {
      this.modalSrv.confirm({
        nzTitle: 'Bạn có chắc chắn muốn thanh toán không ?',
        nzContent: 'Nhấn OK để hoàn thành việc thanh toán',
        nzOnOk: () => {
          let req = {
            "iduser": this.searchParam.iduser,
            "listidpn": listIdPN,
            "soodc": this.searchParam.status05
          }
          this.tableLoading(true);
          this.dataService.thanhtoanmotphan(req).pipe(
            finalize(() => {
              this.tableLoading(false);
            })
          )
          .subscribe(res => {
            if(res == 1) {
              this.message.info("Thực hiện thành công !");
              // get detail khach hang
              this.getDetailKhachhang();
            } else {
              this.message.info(res.msgError);
            }
            this.getDataList();
            this.tableLoading(false);
          })
        }
      })
    }
  }

  resetForm() {
    this.searchParam = {};
    this.tenkhachhang = "";
    this.searchParam.ghichu = "Nợ";
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
        this.commonService.tongnoUser({iduser:param['id']}).subscribe(res=>{
           this.sotienno = res;
           this.cdf.detectChanges();
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
  }

  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
  }

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: true,
      headers: [
        {
          title: 'Số ODC',
          width: 200,
          field: 'status05',
        },
        {
          title: 'Khách hàng',
          width: 200,
          field: 'khachhang',
          tdTemplate: this.khachhangTpl
        },
        {
          title: 'Nội dung đơn hàng',
          width: 450,
          field: 'idphieunhaphang',
          tdTemplate: this.noidungdonhangTpl
        },
        {
          title: 'Số tiền',
          width: 120,
          field: 'sotien',
          tdTemplate: this.sotienTpl
        },
        {
          title: 'Trang Thái',
          width: 180,
          field: 'trangthai',
          tdTemplate: this.trangthaiTpl
        },
        {
          title: 'Số lượng',
          width: 120,
          field: 'soluong',
          tdTemplate: this.soluongTpl
        },
        {
          title: 'Đơn vị tính',
          width: 120,
          field: 'donvitinh',
          tdTemplate: this.donvitinhTpl
        },
        {
          title: 'Nguồn xe',
          width: 250,
          field: 'nguonxe',
          tdTemplate: this.nguonxeTpl
        },
        {
          title: 'Ngày',
          field: 'ngay',
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

    // data exprot pdf
  generateData() {
    let data : any[] = [];
    for(let element of this.dataList) {
      if(element['_checked'] == true) {
        let nddh = "";
        if(element['status01'] == '') {
           nddh = element['idphieunhaphang']['noidungdonhang']
           
        } else {
           nddh = element['idphieunhaphang']['thongtindonhang']
        }
        let item = [
          this.formatDate(element['ngay']),
          nddh,
          this.displayVND(element['sotien']) 
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
      this.commonService.getODC().pipe()
      .subscribe(async res => {
        let title = "Công nợ " + this.tenkhachhang;
        let header= [['Ngày Vận Chuyển','Thông Tin Đơn Hàng', "Tiền cước"]];
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
        headerlayout[4]['field'] = 'Số ODC:';
        headerlayout[4]['value'] =  this.displayOD(res);
        await this.pdfService.exportPDF(header,headerlayout,this.generateData(),title,this.getDate(),"Bên thanh toán","Bên Vận Chuyển",res);
        // update so odc cho các don hàng đã exprot
        let lstId = [];
        for(let element of this.dataList) {
           lstId.push(element['id']);
        }
        let req = {
          lstId : lstId,
          soodc : res,
          idkhachhang:this.idkhachhang,
          tongcuoc: this.fnTongCuoc()
        }
        // update soodc vào trong trường status05
        this.dataService.UpdateStauts05(req).pipe()
        .subscribe(res=> {
          if(res == 1) {
            this.modalSrv.info({nzTitle: "Cập nhật thành công !"});
            this.getDataList();
          }
        })
      })
     
    } else {
      this.modalSrv.info({nzTitle: "Vùi chọn ít nhất một đơn hàng để xuất cộng nợ"});
    }

  }

  fnTongCuoc() {
    let tongcuoc = 0;
    for(let element of this.dataList) {
        tongcuoc = tongcuoc + element['sotien'];
    }
    return tongcuoc;
  }

  fnGetIddonhang(str: string) {
    let strid = str.substring(0, 24);
    return strid;
  }

}
