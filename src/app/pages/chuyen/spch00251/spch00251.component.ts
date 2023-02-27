import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UrlDisplayId } from '@app/common/UrlDisplay';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import { BaseComponent } from '@app/pages/system/base/base.component';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as Const from '@app/common/const';
import { ActionCode } from '@app/config/actionCode';
import { OptionsInterface } from '@app/core/services/types';
import { MyTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Chitietchuyenngoai } from '@app/core/model/chitietchuyenngoai.model';
import { SubwindowCtchuyenngoaiService } from '@app/widget/modal/subwindowctchuyenngoai/subwindow-ctchuyenngoai.service'
import { ModalBtnStatus } from '@app/widget/base-modal';
interface SearchParam {
  ngaybatdau: string | null;
  ngayketthuc: string | null;
  biensoxe: string;
  idtai : string;
  idphu : string;
  trangthai: any;

}
@Component({
  selector: 'app-spch00251',
  templateUrl: './spch00251.component.html',
  styleUrls: ['./spch00251.component.less']
})
export class Spch00251Component extends BaseComponent implements OnInit {
  override fnInit() {
    
  }

  override destroy() {
    
  }

  override DisplayScreenID: UrlDisplayId = UrlDisplayId.spch00251;

  constructor(
    protected override webService: WebserviceService,
    protected override router: Router,
    protected override cdf :  ChangeDetectorRef,
    protected override  datePipe : DatePipe,
    public message: NzMessageService,
    private subwinCtChuyenngoaiService: SubwindowCtchuyenngoaiService
  ) { 
    super(webService,router,cdf,datePipe);
  }

  searchParam: Partial<SearchParam> = {};
  dateFormat = Const.dateFormat;
  tableConfig!: MyTableConfig;
  dataList: any[] = [];
  checkedCashArray: any[] = [];
  ActionCode = ActionCode;
  availableOptions: OptionsInterface[] = [];

  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Quản lý chuyến ngoài',
    breadcrumb: ["Home","Chuyến","Quản lý chuyến ngoài"],
    desc: ''
  };

  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('tiencuocTpl', { static: true }) tiencuocTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('tiencuocxengoaiTpl', { static: true }) tiencuocxengoaiTpl!: TemplateRef<NzSafeAny>;
  // mode
  idchuyenngoai: any;

  nguonxe: any;

  sdtnguonxe: any;

  ngaynhap: string | null = null;
  ngayvanchuyen: string | null = null;
  ngaydukiengiaohang: string | null = null;

  listnguonxe: any = [];

  biensoxe = "";
  tentaixe = "";
  sodienthoai = "";
  ghichu = "";

  listdetail: Chitietchuyenngoai[] = [];
  ctchuyenngoai!: Chitietchuyenngoai;

  // disbale
  disabledidchuyenngoai = true;
  disabledsdtnguonxe = true;

  showConfirm = false;
  btnConfirm = true;

  override ngOnInit(): void {
     this.initTable();
     this.showBtnConfirm();
  }

  fnBtnConfirm() {

  }

  reloadTable(): void {
    this.message.info('Đã được làm mới');
    this.getDataList();
  }

  getDataList(e?: NzTableQueryParams) {
    this.tableLoading(true);
    if (this.listdetail.length > 0) {
      this.dataList = [...this.listdetail];
      this.tableLoading(false);
    } else {
      this.tableLoading(false);
    }
  }

  selectedChecked(e: Chitietchuyenngoai[]): void {
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

  add() {
    this.subwinCtChuyenngoaiService.show({ nzTitle:'Thêm mới' }).subscribe(
      res => {
        if (!res || res.status === ModalBtnStatus.Cancel){
          return;
        }
        this.tableLoading(true);
        this.mergeDetail(res.modalValue);
        this.addListDetail();
        this.getDataList();
        this.showBtnConfirm();
      },
      error => this.tableLoading(false)
    )
  }

  edit(stt: any) {
    let res : any;
    for (let element of this.dataList) {
      if(element["stt"] === stt) {
        res = element;
      }
    }
    this.subwinCtChuyenngoaiService.show({ nzTitle: 'Cập nhật' }, res).subscribe(({ modalValue, status }) => {
      if (status === ModalBtnStatus.Cancel) {
        return;
      }
      this.tableLoading(true);
      modalValue.stt = stt;
      this.mergeUpdateList(modalValue);
      this.getDataList();
    })
  }

  del(stt:any) {

  }

  showBtnConfirm() {
    if(this.dataList.length > 0) {
      this.showConfirm = true;
    } else {
      this.showConfirm = false;
    }
  }

  allDel() {

  }

  addListDetail() {
    if(this.ctchuyenngoai){
       this.listdetail = this.listdetail.concat(this.ctchuyenngoai);
    }
  }

  mergeDetail(ctdetail: any) {
    let stt = this.listdetail.length + 1;
    this.ctchuyenngoai = ctdetail;
    this.ctchuyenngoai.stt = stt;
    return this.ctchuyenngoai;
  }

  mergeUpdateList(ctdetail: any) {
    for(let element of this.listdetail) {
      if(element.stt == ctdetail.stt) {
        element.thongtindonhang = ctdetail['thongtindonhang'];
        element.diadiembochang = ctdetail['diadiembochang'];
        element.ghichu = ctdetail['ghichu'];
        element.htttkhachhang = ctdetail['htttkhachhang'];
        element.htttxengoai = ctdetail['htttxengoai'];
        element.sdtnguoinhan = ctdetail['sdtnguoinhan'];
        element.tennguoinhan = ctdetail['tennguoinhan'];
        element.diachinguoinhan = ctdetail['diachinguoinhan'];
        element.tiencuoc = ctdetail['tiencuoc'];
        element.tiencuocxengoai = ctdetail['tiencuocxengoai'];
      }
    }
  }

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: false,
      headers: [
        {
          title: 'STT',
          field: 'stt',
          width: 80,
        },
        {
          title: 'Thông tin đơn hàng',
          field: 'thongtindonhang',
          width: 280,
        },
        {
          title: 'Địa điểm bốc hàng',
          width: 280,
          field: 'diadiembochang'
        },
        {
          title: 'Tiền cước',
          width: 120,
          field: 'tiencuoc',
          tdTemplate: this.tiencuocTpl
        },
        {
          title: 'Tiền thuê xe ngoài',
          width: 250,
          field: 'tiencuocxengoai',
          tdTemplate: this.tiencuocxengoaiTpl
        },
        {
          title: 'HTTT xe ngoài',
          width: 200,
          field: 'htttxengoai',

        },
        {
          title: 'HTTT khách hàng',
          width: 200,
          field: 'htttkhachhang',
 
        },
        {
          title: 'Tên người nhận',
          width: 150,
          field: 'tennguoinhan'
        },
        {
          title: 'SDT người nhận',
          width: 150,
          field: 'sdtnguoinhan'
        },
        {
          title: 'Đia chỉ người nhận',
          width: 230,
          field: 'diachinguoinhan'
        },
        {
          title: 'Ghi chú',
          width: 350,
          field: 'ghichu'
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
