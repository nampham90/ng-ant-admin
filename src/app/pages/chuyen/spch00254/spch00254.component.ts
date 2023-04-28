import { DatePipe ,formatNumber } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UrlDisplayId } from '@app/common/UrlDisplay';
import { TabService } from '@app/core/services/common/tab.service';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import { BaseComponent } from '@app/pages/system/base/base.component';
import * as Const from "src/app/common/const";
import { ActionCode } from '@app/config/actionCode';
import { OptionsInterface, SearchCommonVO } from '@app/core/services/types';
import { MyTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SubwindowsearchnguonxeService } from '@app/widget/modal/subwindowsearchnguonxe/subwindowsearchnguonxe.service';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Congnonguonxe } from '@app/core/model/congnonguonxe.model';
import { CongnoxengoaiService } from '@app/core/services/http/congnoxengoai/congnoxengoai.service';
import { finalize } from 'rxjs';
import  _ from 'lodash';
import { ModalBtnStatus } from '@app/widget/base-modal';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { LayoutPdfService } from '@app/core/services/common/layout-pdf.service';
import { DonhangexportxengoaiService } from '@app/core/services/http/donhangexportxengoai/donhangexportxengoai.service';
import { VideoyoutubeService } from '@app/widget/modal/subwindowvideoyoutube/videoyoutube.service';
import { CommonService } from '@app/core/services/http/common/common.service';
interface SearchParam {
  ngaybatdau: string | null;
  ngayketthuc: string | null;
  nguonxe : string;
  status01: number | string;
}

interface FormatExport {
  listId : any[];
  donvivanchuyen: string;
  tongcuoc: number;
}
@Component({
  selector: 'app-spch00254',
  templateUrl: './spch00254.component.html',
  styleUrls: ['./spch00254.component.less']
})
export class Spch00254Component extends BaseComponent implements OnInit {
  override fnInit() {
    
  }
  override destroy() {
    
  }
  override DisplayScreenID: UrlDisplayId = UrlDisplayId.spch00254;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Công nợ xe ngoài',
    breadcrumb: ["Home","Chuyến","Công nợ xe ngoài"],
    desc: ''
  };
  constructor(
    protected override webService: WebserviceService,
    protected override router: Router,
    protected override cdf :  ChangeDetectorRef,
    protected override  datePipe : DatePipe,
    protected override tabService: TabService,
    protected override modalVideoyoutube: VideoyoutubeService,
    private dataService : CongnoxengoaiService,
    public message: NzMessageService,
    private modalSrv: NzModalService,
    private modalNguonXeService: SubwindowsearchnguonxeService,
    private pdfService: LayoutPdfService,
    private donhangexpService: DonhangexportxengoaiService,
    private commonService: CommonService
  ) {
    super(webService,router,cdf,datePipe,tabService,modalVideoyoutube);
   }

  searchParam: Partial<SearchParam> = {};
  dateFormat = Const.dateFormat;
  tableConfig!: MyTableConfig;
  dataList: any[] = [];
  checkedCashArray: any[] = [];
  ActionCode = ActionCode;
  availableOptions: OptionsInterface[] = [];

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

  nguonxenm = "";
  stocknx = "";

  // cờ check đã thức hiện tiem kiêm
  searchkbn = false;

  btnDisble = false;

  @ViewChild('nguonxeTpl', { static: true }) nguonxeTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('donhangTpl', { static: true }) donhangTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('sotiennoTpl', { static: true }) sotiennoTpl!: TemplateRef<NzSafeAny>;

  override ngOnInit(): void {
    this.searchParam.status01 = "0";
    this.initTable();
  }
  // show moda search nguon xe
  searchNguonXeClick() {
    this.modalNguonXeService.show({nzTitle: 'Danh Sách Nguồn Xe'}, {showcomfirm:false}).subscribe(
      res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        const param = { ...res.modalValue };
        this.searchParam.nguonxe=param['id'];
        this.stocknx = param['id'];
        this.nguonxenm = param['datacd'];
        this.searchkbn = true;
        this.getDataList();
      },
    )
  }

  fnFocusOutNguonxe() {
    if(this.searchParam.nguonxe != this.stocknx) {
      this.nguonxenm = "";
    }
  }

  getDataList(e?: NzTableQueryParams) {
    this.tableLoading(true);
    this.searchParam.ngaybatdau = this.formatDate(this.ngaybatdau);
    this.searchParam.ngayketthuc = this.formatDate(this.ngayketthuc);
    this.searchParam.status01 = _.toNumber(this.searchParam.status01);
    const params: SearchCommonVO<any> = {
      pageSize: this.tableConfig.pageSize!,
      pageNum: e?.pageIndex || this.tableConfig.pageIndex!,
      filters: this.searchParam
    };
    this.dataService.postAll(params)
    .pipe(
      finalize(() => {
        this.tableLoading(false);
      })
    )
    .subscribe(data => {
      const { list, total, pageNum } = data;
      this.dataList = [...list];
      if(this.dataList.length == 0) {
        //this.message.info('Không Có dữ liệu');
      }
      this.tableConfig.total = total!;
      this.tableConfig.pageIndex = pageNum!;
      this.tableLoading(false);
      this.checkedCashArray = [...this.checkedCashArray];
      this.searchParam.status01 = this.searchParam.status01 + "";
    })
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

  
  selectedChecked(e: Congnonguonxe[]): void {
    this.checkedCashArray = [...e];
  }

  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
  }

  resetForm() {
    this.searchkbn = false;
    this.searchParam = {};
    this.searchParam.status01 = 0
    this.nguonxenm = "";
    this.getDataList();
  }

  changeStatus($event: any) {
    if($event == 2 || $event == 1) {
      this.btnDisble = true;
    } else {
      this.btnDisble = false;
    }
    this.getDataList();
  }

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: true,
      headers: [
        {
          title: 'Số HDTTXN',
          field: 'sohdttxn',
          width: 300
        },
        {
          title: 'Thông Tin đơn hàng',
          field: 'iddonhang',
          width: 250,
          tdTemplate: this.donhangTpl
        },
        {
          title: 'Số tiền ',
          width: 200,
          field: 'sotienno',
          tdTemplate: this.sotiennoTpl
        },
        {
          title: 'Nguồn Xe',
          width: 300,
          field: 'nguonxe',
          tdTemplate: this.nguonxeTpl
        },
        {
          title: 'Ngày phát hành',
          width: 250,
          field: 'ngaynhap',
          pipe: "date: dd/MM/YYYY HH:mm"
        },
        {
          title: 'Biển số xe',
          width: 200,
          field: 'biensoxe',
        },
        {
          title: 'Tên tài xe',
          width: 200,
          field: 'tentaixe',
        },
        {
          title: 'SDT Tài xế',
          width: 200,
          field: 'sodienthoai',
        },
        {
          title: 'Ghi chú',
          width: 450,
          field: 'ghichu',
          tdTemplate: this.operationTpl
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
      if(element['_checked'] === true) {
        let item = [
          element['iddonhang']['_id'],
          element['iddonhang']['thongtindonhang'],
          this.formatDate(element['ngaynhap']),
          element['tentaixe'],
          this.displayVND(element['sotienno'])
        ]
        data.push(item);
      }
    }
    return data;
  }

  // xuất file pdf gửi cho nguồn xe
  exportPDF(system: string) {
    // kiểm tra xem đã search đúng nguồn xe chưa
    if (this.searchkbn === false) {
      this.modalSrv.info({nzTitle: "Vui lòng chọn đơn vị Nguồn xe !"});
      return;
    }
    if(this.dataList.length == 0) {
      this.modalSrv.info({nzTitle: "Không có dử liệu !"});
      return;
    }
    // kiểm tra xem đã check dư liệu chưa
    let data = this.generateData();
    if(data.length == 0) {
      this.modalSrv.info({nzTitle: "Vui lòng chọn đơn hàng !"});
      return;
    }

    let canhbao = "";
    let contentcanhbao = "";
    if(system == "0") {
      canhbao = "Bạn chắc chắn muốn xuất file PDF";
      contentcanhbao = "Sau khi xuất file đơn hàng của bạn sẽ chuyển vào trạng thái chờ Thanh Toán.\n Và không thế cập nhật !"
    } else {
      canhbao = "Bạn chắc chắn muốn Thánh toán và Xuất file PDF";
      contentcanhbao = "Sau khi Thanh Toán đơn hàng của bạn sẽ chuyển vào trạng thái đã Thanh Toán.\n Và không thể cập nhật !"
    }
    this.modalSrv.confirm({
      nzTitle: canhbao,
      nzContent: contentcanhbao,
      nzOnOk: ()=> {
        //tinh tong cuoc
        //lấy list id
        //get đơn vi vận chuyển
        this.commonService.getHDTTXN().pipe()
        .subscribe(async res => {
          if(res) {
            let formatExp = this.fnFormat();
            let title = "Danh Sách Công Nợ";
            let header= [['MaDH','Thông Tin Đơn Hàng', 'Ngày Phat Hành', 'Tên tài xế', "Tiền cước"]];
            this.pdfService.clearHeader();
            let headerlayout = Const.headerLayout;
            headerlayout[0]['field'] = 'Đơn vi vận chuyển:';
            headerlayout[0]['value'] = formatExp.donvivanchuyen;
            headerlayout[1]['field'] = 'Tổng tiền thanh toán:';
            headerlayout[1]['value'] =  this.displayVND(formatExp.tongcuoc);
            headerlayout[2]['field'] = 'Tổng số đơn hàng cần thanh toán:';
            headerlayout[2]['value'] = data.length + '';
            headerlayout[3]['field'] = 'Số HDTTXN:';
            headerlayout[3]['value'] = res;
            await this.pdfService.exportPDF(header,headerlayout,data,title,this.getDate(),"BVC ký xác nhận","BTT ký xác nhận",res);
            // insert vao bang donhangexport với thông tin gồm. header, và data status01 = 1. chờ thanh toán
            this.createDataExport(this.searchParam.nguonxe!,this.getDate(),title,data,headerlayout,header,system,formatExp.listId,res);
            this.getDataList();
          } else {
            this.modalSrv.info({nzTitle: "Lỗi hệ thống không tạo được Số HDTTXN !"})
          }
        })

      }
    });
    
  }

  // fn tinh tong cuoc
  fnFormat() {
    let res: FormatExport = {
      listId : [],
      tongcuoc : 0,
      donvivanchuyen: ""
    };
    for(let element of this.dataList) {
      if(element['_checked'] === true) {
         res.listId.push(element['id']);
         res.tongcuoc = res.tongcuoc + element['sotienno'];
         res.donvivanchuyen =  element['nguonxe']['datacd']+ "-" + element['nguonxe']['datanm'];
      }
    }
    return res;
  }

  // insert data export
  createDataExport(nguonxe: string, ngay: any, title: string, data: any, headerlayout: any, header: any,system: string,lstid: any,sohdttxn:string) {
    let req = {
       syskbn: system,
       sohdttxn: sohdttxn,
       nguonxe: nguonxe,
       ngayxuat: ngay,
       title: title,
       lstdata: data,
       lstheader: headerlayout,
       header: header,
       lstId: lstid
    }
    this.donhangexpService.postCreate(req).pipe()
    .subscribe(res => {
      if(res) {
        this.modalSrv.success({nzTitle: "Thực hiện Thành công !",nzOnOk: ()=>{
          this.getDataList();
        }})
      } else {
        this.modalSrv.error({nzTitle: "Error System !"})
      }
    })
  }
}