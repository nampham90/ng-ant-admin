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
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NguonxeService } from '@app/core/services/http/nguonxe/nguonxe.service';
import { ChuyenngoaiService } from '@app/core/services/http/chuyenngoai/chuyenngoai.service';
import { ChuyenngoaidtoService } from '@app/core/services/http/chuyenngoai/chuyenngoaidto.service';
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

  headerForm!: FormGroup;
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
    private subwinCtChuyenngoaiService: SubwindowCtchuyenngoaiService,
    private modalSrv: NzModalService,
    private nguonxeService: NguonxeService,
    private dataService: ChuyenngoaiService,
    private chuyenngoaiDto: ChuyenngoaidtoService,
    private fb: FormBuilder
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
  @ViewChild('thongtindonhangTpl', { static: true }) thongtindonhangTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('diadiembochangTpl', { static: true }) diadiembochangTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('ghichuTpl', { static: true }) ghichuTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('htttkhachhangTpl', { static: true }) htttkhachhangTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('htttxengoaiTpl', { static: true }) htttxengoaiTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('sdtnguoinhanTpl', { static: true }) sdtnguoinhanTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('tennguoinhanTpl', { static: true }) tennguoinhanTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('diachinguoinhanTpl', { static: true }) diachinguoinhanTpl!: TemplateRef<NzSafeAny>;
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
     this.headerForm = this.createForm();
     this.showBtnConfirm();
     this.fnGetAllNguonXe();
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

  fnBtnConfirm() {
    let req = {}
    if(this.chuyenngoaiDto.initFlg === false) {
      req = {
          "spch00251Header": this.headerForm.value,
          "spch00251Listdetail": this.dataList,
          "mode": "update" // them mới và updade củ
      }
    } else {
      req = {
        "spch00251Header": this.headerForm.value,
        "spch00251Listdetail": this.dataList,
        "mode": "create" // them mới hoàn toàn
      }
    }
    this.dataService.postCreate(req)
    .pipe()
    .subscribe(res => {
      this.tableLoading(true);
      this.listdetail = res.reslistdetail
      let stt = 1;
      for(let element of this.listdetail) {
        element.stt = stt;
        stt++;
      }
      this.headerForm.patchValue(res.resspch00251Header);
      this.getDataList();
      this.chuyenngoaiDto.initFlg = false;
      this.chuyenngoaiDto.listdetail = res.reslistdetail;
      this.message.success("Đơn hàng đã được đăng ký thành công !");
    })
  }

  createForm() {
    return this.fb.group({
      id : [""],
      nguonxe: [null, [Validators.required]],
      sdtnguonxe: ["", [Validators.required]],
      ngaynhap: [null, [Validators.required]],
      ngayvanchuyen: [null, [Validators.required]],
      ngaydukiengiaohang: [null],
      biensoxe: [null, [Validators.required]],
      tentaixe: [null, [Validators.required]],
      sodienthoai: [null, [Validators.required]],
      ghichu: [""]
    })
  }

  submitForm() {
     console.log("submit", this.headerForm.value);
  }


  fnChangeNguonXe($event: any) {
    let req = {
       id : $event
    }
    this.nguonxeService.postDetail(req).pipe().subscribe(res => {
       this.headerForm.patchValue({sdtnguonxe: res.sodienthoai});
    })
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
    this.modalSrv.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa nó không?',
      nzContent: 'Không thể phục hồi sau khi xóa',
      nzOnOk: () => {
        this.tableLoading(true);
        this.listdetail = this.listdetail.filter(item => item['stt'] !== stt);
        this.dataList = [...this.listdetail];
        this.tableLoading(false);
      }
    });
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
    let stt: number = 0;
    let n = this.listdetail.length;
    if (n == 0) {
       stt = 1;
    } else {
      let sttthn = this.listdetail[n-1].stt;
      if(sttthn && sttthn > 0) {
        stt = sttthn + 1;
      }
    }
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
          tdTemplate: this.thongtindonhangTpl
        },
        {
          title: 'Địa điểm bốc hàng',
          width: 280,
          field: 'diadiembochang',
          tdTemplate: this.diadiembochangTpl
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
          tdTemplate: this.htttxengoaiTpl

        },
        {
          title: 'HTTT khách hàng',
          width: 200,
          field: 'htttkhachhang',
          tdTemplate: this.htttkhachhangTpl
        },
        {
          title: 'Tên người nhận',
          width: 150,
          field: 'tennguoinhan',
          tdTemplate: this.tennguoinhanTpl
        },
        {
          title: 'SDT người nhận',
          width: 150,
          field: 'sdtnguoinhan',
          tdTemplate: this.sdtnguoinhanTpl
        },
        {
          title: 'Đia chỉ người nhận',
          width: 230,
          field: 'diachinguoinhan',
          tdTemplate: this.diachinguoinhanTpl
        },
        {
          title: 'Ghi chú',
          width: 350,
          field: 'ghichu',
          tdTemplate: this.ghichuTpl
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
