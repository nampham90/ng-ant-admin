import { DatePipe,formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UrlDisplayId } from '@app/common/UrlDisplay';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import { BaseComponent } from '@app/pages/system/base/base.component';
import * as Const from '@app/common/const';
import { ActionCode } from '@app/config/actionCode';
import { OptionsInterface, SearchCommonVO } from '@app/core/services/types';
import { MyTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Chuyenngoai } from '@app/core/model/chuyenngoai.model';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ChuyenngoaiService } from '@app/core/services/http/chuyenngoai/chuyenngoai.service';
import { finalize } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NguonxeService } from '@app/core/services/http/nguonxe/nguonxe.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TabService } from '@app/core/services/common/tab.service';
import { ChuyenngoaidtoService } from '@app/core/services/http/chuyenngoai/chuyenngoaidto.service';
import { CommonService } from '../../../core/services/http/common/common.service';
import { LayoutPdfService } from '@app/core/services/common/layout-pdf.service';
import { VideoyoutubeService } from '@app/widget/modal/subwindowvideoyoutube/videoyoutube.service';
import { ModalBtnStatus } from '@app/widget/base-modal';

interface SearchParam {
  ngaybatdau: string | null;
  ngayketthuc: string | null;
  nguonxe : string;
  biensoxe: string;
  _id: string;
  soods: string;
}

@Component({
  selector: 'app-spch00252',
  templateUrl: './spch00252.component.html',
  styleUrls: ['./spch00252.component.less']
})
export class Spch00252Component extends BaseComponent implements OnInit {

  override fnInit() {
    
  }
  override destroy() {
    
  }
  override DisplayScreenID: UrlDisplayId =  UrlDisplayId.spch00251;

  searchParam: Partial<SearchParam> = {};
  dateFormat = Const.dateFormat;
  tableConfig!: MyTableConfig;
  dataList: any[] = [];
  checkedCashArray: any[] = [];
  ActionCode = ActionCode;
  availableOptions: OptionsInterface[] = [];

  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Tìm kiếm chuyến ngoài',
    breadcrumb: ["Home","Chuyến","Tìm kiếm chuyến ngoài"],
    desc: ''
  };

  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('nguonxeTpl', { static: true }) nguonxeTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('machuyenngoaiTpl', { static: true }) machuyenngoaiTpl!: TemplateRef<NzSafeAny>;

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

  listnguonxe: any = [];
  showUpdate = false;
  showDelete = false;

  constructor(
    protected override webService: WebserviceService,
    protected override router: Router,
    protected override cdf :  ChangeDetectorRef,
    protected override  datePipe : DatePipe,
    protected override modalVideoyoutube: VideoyoutubeService,
    private dataService: ChuyenngoaiService,
    private modalSrv: NzModalService,
    private nguonxeService: NguonxeService,
    public message: NzMessageService,
    protected override tabService: TabService,
    private ChuyenngoaiDto:ChuyenngoaidtoService,
    private commonService: CommonService,
    private pdfService: LayoutPdfService,
    
  ) { 
    super(webService,router,cdf,datePipe,tabService,modalVideoyoutube);
  }

  override ngOnInit(): void {
    this.fnGetAllNguonXe();
    this.initTable();
  }

  reloadTable(): void {
    this.message.info('Đã được làm mới');
    this.getDataList();
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
    this.dataService.postallChuyenngoai(params)
    .pipe(
      finalize(()=>{
        this.tableLoading(false);
      })
    )
    .subscribe(data => {
      const { list, total, pageNum } = data;
      this.dataList = [...list];
      if(this.dataList.length == 0) {
        this.message.info('Không Có dữ liệu');
      }
      this.tableConfig.total = total!;
      this.tableConfig.pageIndex = pageNum!;
      this.tableLoading(false);
      this.checkedCashArray = [...this.checkedCashArray];
    })
  }

  selectedChecked(e: Chuyenngoai[]): void {
    this.checkedCashArray = [...e];
  }

  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
  }

  tableChangeDectction(): void {
    this.dataList = [...this.dataList];
    this.cdf.detectChanges();
  }

  tableLoading(isLoading: boolean): void {
    this.tableConfig.loading = isLoading;
    this.tableChangeDectction();
  }

  resetForm() {
    this.searchParam = {};

    this.getDataList();
 }

  // thêm mơi chuyến ngoài
  add() {
    this.ChuyenngoaiDto.clear();
    this.transfer(Const.rootbase + UrlDisplayId.spch00251);
  }

  allDel() {

  }

  transferSpch00251(id: string, mode: string) {
    this.ChuyenngoaiDto.mode = mode;
    this.ChuyenngoaiDto.id = id;
    this.ChuyenngoaiDto.initFlg = false;
    this.transfer(Const.rootbase + UrlDisplayId.spch00251);
  }

  fnGetAllNguonXe() {
    let req = {
      pageSize: 0,
      pageNum: 0
    }
    this.nguonxeService.postAll(req).pipe().subscribe(res => {
        this.listnguonxe = res;
    })
  }

  copy(idchuyenngoai: any) {
    return `${idchuyenngoai}`;
  }

  exportPDF(id: string) {
    this.modalSrv.confirm({
      nzTitle: "Bạn có chắc chắn muốn xuất phiếu không ?",
      nzContent: "Không thể cập nhật sau khi xuất. Nhấn OK để thực hiện xuất pdf",
      nzOnOk: ()=> {
        this.dataService.postExportDetail({id:id}).pipe()
        .subscribe(data => {
          let ods = data['ods'];
          let title = "Hóa Đơn Vận Chuyển - " + Const.doanhnghiep;
          let header = [['Thông tin đơn hàng','Địa điểm bóc hàng','Tên người nhận','SDT người nhận','Địa chỉ người nhận','Ghi chú']];
          let dataHeader = this.fnreturnHeaderPDF(data['resHeader'],ods);
          let lstdata = this.fngenerateData(data['listdetail']);
          this.pdfService.exportPDF(header,dataHeader,lstdata,title,this.getDate(),"Tài xế ký nhận","Khách hàng ký nhận");
          // update status02 = 1;
          this.fnUpdateStatus02(id);
          this.getDataList();
          this.ChuyenngoaiDto.clear();
        })
      }
    })
  }

  fnreturnHeaderPDF(dataheader: any,ods:any) {
    let ngayvanchuyen : Date =  dataheader['ngayvanchuyen'];
    const format = 'dd/MM/yyyy';
    const locale = 'vi-VN';
    const timezone = 'UTC+7';
    const formattedDate = formatDate(ngayvanchuyen, format, locale, timezone);
    let layoutHeader = Const.headerLayout;
    layoutHeader[0]['field'] = 'số ODS:';
    layoutHeader[0]['value'] = ods;
    layoutHeader[1]['field'] = 'Tài xế:';
    layoutHeader[1]['value'] = dataheader['tentaixe'];
    layoutHeader[2]['field'] = 'Biến số xe:';
    layoutHeader[2]['value'] =  dataheader['biensoxe'];
    layoutHeader[3]['field'] = 'Ngày vận chuyển:';
    layoutHeader[3]['value'] = formattedDate;
    return layoutHeader;
  }

  fngenerateData(lstdata:any) {
    let data : any[] = [];
    for(let element of lstdata) {
      let item = [
        element['thongtindonhang'],
        element['diadiembochang'],
        element['tennguoinhan'],
        element['sdtnguoinhan'],
        element['diachinguoinhan'],
        element['ghichu']
      ]
      data.push(item);
    }
    return data;
  }

  fnUpdateStatus02(id: any){
    this.dataService.postUpdateStatus02({id:id}).pipe()
    .subscribe(res => {
      if(res != null) {
         this.message.success("cập nhật thành công !");
      }
    })
  }

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: true,
      headers: [
        {
          title: 'Mã chuyến ngoài',
          field: 'id',
          width: 250,
          tdTemplate: this.machuyenngoaiTpl
        },
        {
          title: 'Nguồn xe',
          width: 300,
          field: 'nguonxe',
          tdTemplate: this.nguonxeTpl
        },
        {
          title: 'Ngày vận chuyển',
          width: 200,
          field: 'ngayvanchuyen',
          pipe: "date: dd/MM/YYYY HH:mm"
        },
        {
          title: 'Biển số xe',
          width: 150,
          field: 'biensoxe',
        },
        {
          title: 'Số điện thoại',
          width: 150,
          field: 'sdtnguonxe',
        },
        {
          title: 'Tên tài xế',
          width: 250,
          field: 'tentaixe',
        },
        {
          title: 'SDT tài xế',
          width: 200,
          field: 'sodienthoai',
        },
        {
          title: 'Hành động',
          tdTemplate: this.operationTpl,
          width: 300,
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
