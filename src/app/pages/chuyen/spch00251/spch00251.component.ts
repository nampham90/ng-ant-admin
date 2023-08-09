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
import { OptionsInterface, SearchCommonVO } from '@app/core/services/types';
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
import { TabService } from '@app/core/services/common/tab.service';
import { VideoyoutubeService } from '@app/widget/modal/subwindowvideoyoutube/videoyoutube.service';
import { Spin00901Service } from '@app/core/services/http/trongkho/spin00901.service';
import { finalize } from 'rxjs';
import { SubcommonsoidService } from '@app/widget/modal/common/subcommonsoid/subcommonsoid.service';
import { Spch00251Service } from '@app/core/services/http/chuyen/spch00251.service';
import { Phieunhaphang } from '@app/core/model/phieunhaphang.model';
import { PhieunhaphangService } from '@app/core/services/http/phieunhaphang/phieunhaphang.service';
import { ChiPhiDVTN } from '@app/core/model/chiphidichvuthuengoai.model';
import { Chuyenngoai } from '@app/core/model/chuyenngoai.model';
import { ThemeSkinService } from '@app/core/services/common/theme-skin.service';

interface SearchParam {
  ngaybatdau: string | null;
  ngayketthuc: string | null;
  biensoxe: string;
  idtai : string;
  idphu : string;
  trangthai: any;

}

export interface ParamsCU {
  spch00251Header: Chuyenngoai,
  spch00251Listdetail: Phieunhaphang[],
  mode: string
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
    // this.chuyenngoaiDto.clear();
  }

  override DisplayScreenID: UrlDisplayId = UrlDisplayId.spch00251;

  constructor(
    protected override webService: WebserviceService,
    protected override router: Router,
    protected override cdf :  ChangeDetectorRef,
    protected override  datePipe : DatePipe,
    protected override tabService: TabService,
    protected override modalVideoyoutube: VideoyoutubeService,
    public message: NzMessageService,
    private subwinCtChuyenngoaiService: SubwindowCtchuyenngoaiService,
    private modalSrv: NzModalService,
    private nguonxeService: NguonxeService,
    private dataService: ChuyenngoaiService,
    private chuyenngoaiDto: ChuyenngoaidtoService,
    private spin00901Service : Spin00901Service,
    private fb: FormBuilder,
    private modalListSoIDService: SubcommonsoidService,
    private spch00251Service: Spch00251Service,
    private phieunhaphangService: PhieunhaphangService
    
  ) { 
    super(webService,router,cdf,datePipe,tabService,modalVideoyoutube);
  }

  searchParam: Partial<SearchParam> = {};
  dateFormat = Const.dateFormat;
  tableConfig!: MyTableConfig;
  dataList: Phieunhaphang[] = [];
  checkedCashArray: any[] = [];
  ActionCode = ActionCode;
  availableOptions: OptionsInterface[] = [];

  listbsxe = [];
  listtaixe = [];

  listIDHuy: Phieunhaphang[] = [];
  listIDUpdate: Phieunhaphang[] = [];

  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Quản lý chuyến ngoài',
    breadcrumb: ["Home","Chuyến","Quản lý chuyến ngoài"],
    desc: ''
  };

  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('tiencuocTpl', { static: true }) tiencuocTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('tiencuocxengoaiTpl', { static: true }) tiencuocxengoaiTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('tenhangTpl', { static: true }) tenhangTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('diadiembochangTpl', { static: true }) diadiembochangTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('ghichuTpl', { static: true }) ghichuTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('htttkhachhangTpl', { static: true }) htttkhachhangTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('htttxengoaiTpl', { static: true }) htttxengoaiTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('sdtnguoinhanTpl', { static: true }) sdtnguoinhanTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('tennguoinhanTpl', { static: true }) tennguoinhanTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('diachinguoinhanTpl', { static: true }) diachinguoinhanTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('chiphidvtnTpl', { static: true }) chiphidvtnTpl!: TemplateRef<NzSafeAny>;
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

  listID: Phieunhaphang[] = []
  ctchuyenngoai!: Phieunhaphang;

  // disbale
  disabledidchuyenngoai = true;
  disabledsdtnguonxe = true;

  showConfirm = false;
  btnConfirm = true;

  btnNew = true;
  btnDelete = true;
  btnDeleteAll = true;
  btnUpdate = true;
  showreturnBack = false;

  showHuychuyenngoai = false;
  
  override ngOnInit(): void {
    this.initTable();
    this.headerForm = this.createForm();
    this.showBtnConfirm();
    this.fnGetAllNguonXe();
    // thêm mới
    if(this.chuyenngoaiDto.initFlg === true) {
      this.btnNew = false;
      this.btnDelete = false;
      this.btnDeleteAll = false;
      this.btnUpdate = false;
      this.showreturnBack = false;
    }
    // trường hợp click vào link. chỉ được xem chi tiết
    if(this.chuyenngoaiDto.mode == "link" && this.chuyenngoaiDto.initFlg === false) {
        this.tableLoading(true);
        this.dataService.postDetail({id:this.chuyenngoaiDto.id}).pipe()
        .subscribe(data => {
            this.listID = [...data.listID];
            let stt = 1;
            for(let element of this.listID) {
              element.stt = stt;
              stt++;
            }
            this.getDataList();
            this.headerForm.patchValue(data.resHeader);
            this.showreturnBack = true;
        });
        this.chuyenngoaiDto.mode = "";
        this.chuyenngoaiDto.initFlg = true;
    }
    // trường hơp click vào cập nhật. cho phép cập nhật chuyến 
    if(this.chuyenngoaiDto.mode == "update" && this.chuyenngoaiDto.initFlg === false) {
       this.tableLoading(true);
       this.dataService.postDetail({id:this.chuyenngoaiDto.id}).pipe()
        .subscribe(data => {
            this.listID = [...data.listID];
            let stt = 1;
            for(let element of this.listID) {
              element.stt = stt;
              stt++;
            }
            this.getDataList();
            this.headerForm.patchValue(data.resHeader);
            this.showBtnConfirm();
            this.btnDelete = false;
            this.btnDeleteAll = true;
            this.btnNew = false;
            this.btnUpdate = false;
            this.showreturnBack = true;
            this.showHuychuyenngoai = true;
        });
    }

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

  // check htttxengoai và tiencuocxengoai trước khi đem đi tạo
  // fnCheckDataList() {
  //   for(let element of this.dataList) {
  //     if(element['htttxengoai'] == "" || element['tiencuocxengoai'] == 0) {
  //       return true;
  //       break;
  //     }
  //   }
  //   return false;
  // }

  fnBtnConfirm(): void {
    if(this.headerForm.value.id && this.chuyenngoaiDto.id == "" && this.headerForm.value.id.length == 24) {
       this.chuyenngoaiDto.clear();
       this.headerForm.reset();
       this.dataList = [];
       this.listID = [];
    } else {
      let req : ParamsCU = {
        spch00251Header: this.headerForm.value,
        spch00251Listdetail: this.dataList,
        mode: "" // them mới và updade củ
      }
      let title = "";
      let content = "";
      let mode = "";
      if(this.chuyenngoaiDto.initFlg === false && this.chuyenngoaiDto.mode == "update") {
        mode = "update";
        title = "Bạn chắc chắn muốn cập nhật !";
        content = "Dữ liệu sẽ được cập nhật sau khi nhấn OK";
        req.mode = mode;
        req.spch00251Listdetail = [];
        req.spch00251Header = this.headerForm.getRawValue();

        if(this.checkChangeHeader() === false && this.checkChangeDatalist().length == 0) {
           this.modalSrv.info({nzTitle: "Chưa có sự thay đổi nào !"});
           return;
        }

        if(this.checkChangeHeader() == true) {
          req.spch00251Header.status05 = 1; // có sư thay dổi trong chuyen ngoai
        }

        if(this.checkChangeDatalist().length > 0) {
          req.spch00251Listdetail = this.checkChangeDatalist();
        }

        console.log(this.checkChangeHeader());
        console.log(this.checkChangeDatalist());
      } else {
        // check dataList trước khi gửi đi tạo
        // if(this.fnCheckDataList()== true) {
        //   this.modalSrv.info({
        //     nzTitle: "Vui lòng cập nhật đơn hàng",
        //     nzContent: "Nôi dung cần cập nhật\n 1. Tiền cước xe ngoài\n 2. Httt xe ngoài"
        //   });
        //   return;
        // }
        mode = "create";
        title = "Bạn Có muốn kiểm tra lạ không !";
        content = "Nhấn ok để hoàn thành công việc !";
        req.mode = mode;
      }
      this.tableLoading(true);
      this.modalSrv.confirm({
        nzTitle: title,
        nzContent: content,
        nzOnOk: () => {
          mode == "create"? this.createupdateData(req, "postCreate") : this.createupdateData(req, "postUpdate");
        }
      });
    }
  }
  // kiểm tra có sự thay đổi trên table
  checkChangeDatalist(): Phieunhaphang[] {
    const list1:Phieunhaphang[] = this.dataList;
    let listPNH: Phieunhaphang[] = [];
    listPNH = list1.filter(item1 => !item1.soID).map(item1 => {
      item1.strrsrv10 = "CREATE";
      return item1;
    })
    // danh sach bị hủy
    if(this.listIDHuy.length > 0) {
      listPNH = listPNH.concat(this.listIDHuy);
    }
    // dach dach cap  nhat
    if(this.listIDUpdate.length > 0) {
      listPNH = listPNH.concat(this.listIDUpdate);
    }
    return listPNH;

  }

  // kiểm tra có sự tháy đổi trên form
  checkChangeHeader(): boolean {
    let nguonxe = this.headerForm.get('nguonxe')?.value;
    let ngaynhap = this.headerForm.get('ngaynhap')?.value;
    let ngayvanchuyen = this.headerForm.get('ngayvanchuyen')?.value;
    let ngaydukiengiaohang = this.headerForm.get('ngaydukiengiaohang')?.value;
    let biensoxe = this.headerForm.get('biensoxe')?.value;
    let tentaixe = this.headerForm.get('tentaixe')?.value;
    let hinhthucthanhtoan = this.headerForm.get('hinhthucthanhtoan')?.value;
    let ghichu = this.headerForm.get('ghichu')?.value;

    if( this.chuyenngoaiDto.nguonxe != nguonxe
      || this.chuyenngoaiDto.ngaynhap != ngaynhap
      || this.chuyenngoaiDto.ngayvanchuyen != ngayvanchuyen
      || this.chuyenngoaiDto.ngaydukiengiaohang != ngaydukiengiaohang
      || this.chuyenngoaiDto.biensoxe != biensoxe
      || this.chuyenngoaiDto.tentaixe != tentaixe
      || this.chuyenngoaiDto.hinhthucthanhtoan != hinhthucthanhtoan
      || this.chuyenngoaiDto.ghichu != ghichu
    ) {
        return true;
    } else {
        return false;
    }
  }

  createupdateData(params: ParamsCU, nameMethod: "postCreate" | "postUpdate") : void {
      this.dataService[nameMethod](params)
      .pipe(
        finalize(() => {
          this.tableLoading(false);
        })
      )
      .subscribe(res => {
        this.listID = res.spch00251Listdetail;
        let stt = 1;
        for(let element of this.listID) {
          element.stt = stt;
          stt++;
        }
        this.headerForm.patchValue(res.spch00251Header);
        this.getDataList();
        this.updateChuyenDtoService(res);
      })
  }

  updateChuyenDtoService(res: ParamsCU): void {
    this.chuyenngoaiDto.initFlg = false;
    this.chuyenngoaiDto.mode = "update";
    this.chuyenngoaiDto.listID = res.spch00251Listdetail;
    this.chuyenngoaiDto.soodn = res.spch00251Header.soodn;
    this.chuyenngoaiDto.id = res.spch00251Header.id!;
    this.chuyenngoaiDto.ghichu = res.spch00251Header.ghichu;
    this.chuyenngoaiDto.biensoxe = res.spch00251Header.biensoxe;
    this.chuyenngoaiDto.hinhthucthanhtoan = res.spch00251Header.hinhthucthanhtoan;
    this.chuyenngoaiDto.ngaynhap = res.spch00251Header.ngaynhap;
    this.chuyenngoaiDto.ngayvanchuyen = res.spch00251Header.ngayvanchuyen;
    this.chuyenngoaiDto.ngaydukiengiaohang = res.spch00251Header.ngaydukiengiaohang;
    this.chuyenngoaiDto.nguonxe = res.spch00251Header.nguonxe;
    this.chuyenngoaiDto.sdtnguonxe = res.spch00251Header.sdtnguonxe;
    this.chuyenngoaiDto.tentaixe = res.spch00251Header.tentaixe;
    this.chuyenngoaiDto.sodienthoai = res.spch00251Header.sodienthoai;
    this.chuyenngoaiDto.status01 = res.spch00251Header.status01!;
    this.chuyenngoaiDto.status02 = res.spch00251Header.status02!;
    this.chuyenngoaiDto.status03 = res.spch00251Header.status03!;
    this.chuyenngoaiDto.status04 = res.spch00251Header.status04!;
    this.chuyenngoaiDto.status05 = res.spch00251Header.status05!;
    let msg = ""
    res.mode == 'create' ? msg = "Tạo thành công" : msg = "Cập nhật thành công !";
    this.modalSrv.info({nzTitle: msg})
  }
  
  /// huy chuyến ngoai
  fnBtnHuychuyen() {
    // 1. cập nhật nhật lài tiencuoc=, status02 = 0 ở phieunhaphang . nếu đơn này lấy từ kho
    // 2. xóa chi tiết chuyên ngoài
    // 3. xóa chuyến ngoài
    // params :idchuyenngoai
    const idValue = this.headerForm.get('id')!.value
    if(idValue == "" || idValue == null || idValue == undefined) {
      this.modalSrv.info({nzTitle: "Chuyến hàng không tồn tại"});
      return;
    }
    let req = {
      "idchuyenngoai": idValue
    }
    this.modalSrv.confirm({
      nzTitle: "Bạn chắc chắn muốn hủy chuyến hàng này không ?",
      nzContent: "Sau khi Hủy không thể khôi phục chuyến !",
      nzOnOk: () => {
        this.spch00251Service.Huychuyenngoai(req).subscribe(res => {
          if(res == 1) {
            this.message.success("Hủy thành công !")
            this.headerForm.reset();
            this.dataList = [];
            this.listID = [];
            this.chuyenngoaiDto.clear();
          }
        });
      }
    })
  }

  createForm() {
    return this.fb.group({
      soodn : [""],
      nguonxe: [null, [Validators.required]],
      sdtnguonxe: ["", [Validators.required]],
      ngaynhap: [this.getDate(), [Validators.required]],
      ngayvanchuyen: [null, [Validators.required]],
      ngaydukiengiaohang: [null],
      biensoxe: [null, [Validators.required]],
      tentaixe: [null, [Validators.required]],
      sodienthoai: [null, [Validators.required]],
      hinhthucthanhtoan: ["0", [Validators.required]],
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
       this.fnGetListBiensoxe(res.id);
       this.fnGetListTaiXe(res.sodienthoai);
    })
  }

  // get list biên sô xe vơi rcdkbn là id của nguồn xe
  fnGetListBiensoxe(rcdkbn: any) {
    const params: SearchCommonVO<any> = {
      pageSize: 0,
      pageNum: 0,
      filters: {rcdkbn: rcdkbn}
    };
    this.spin00901Service
    .searchParams(params)
    .pipe(
      finalize(() => {
      })
    )
    .subscribe(res => {
      this.listbsxe = res;
      this.cdf.detectChanges()
    });
  }

  // get list tài xe se ngoài vơi rcdkbn là so điện thoài nguồn xe
  fnGetListTaiXe(rcdkbn: any) {
    const params: SearchCommonVO<any> = {
      pageSize: 0,
      pageNum: 0,
      filters: {rcdkbn: rcdkbn}
    };
    this.spin00901Service
    .searchParams(params)
    .pipe(
      finalize(() => {
      })
    )
    .subscribe(res => {
      this.listtaixe = res;
      this.cdf.detectChanges()
    });
  }

  fnChangeTaiXe($event: any) {
    for(let element of this.listtaixe) {
      if(element['datacd'] == $event) {
         this.headerForm.patchValue({sodienthoai: element['datanm']});
         break;
      }
    }
  }


  reloadTable(): void {
    this.message.info('Đã được làm mới');
    this.getDataList();
  }

  getDataList(e?: NzTableQueryParams) {
    this.tableLoading(true);
    if (this.listID.length > 0) {
      this.dataList = [...this.listID];
      this.tableLoading(false);
    } else {
      this.tableLoading(false);
    }
  }

  selectedChecked(e: Phieunhaphang[]): void {
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
  
  // lây sô  soId trong dataList đưa lên modal
  getListsoId() {
    let listsoId = [];
    for(let element of this.dataList) {
      if(element.soID && element.soID != "") {
        listsoId.push(element.soID)
      }
    }
    return listsoId;
  }

  addtrongkho() {
    let listsoID = this.getListsoId(); 
    this.modalListSoIDService.show({nzTitle: "Danh Hàng tồn kho"},{showcomfirm:false,idchuyen: "NULL",status02: "KHONG",listsoId:listsoID}).subscribe(
      res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        this.getListDetailFromKho(res.modalValue);
      }
    )
  }

  getListDetailFromKho(listIDs: string[]): void{
    for(let element of listIDs) {
      this.phieunhaphangService.getDetailsoID(element).subscribe(res => {
        let item: Phieunhaphang = this.fnmergePNHtoCTCN(res);
        this.mergeDetail(item);
        this.addListDetail();
        this.getDataList();
        this.showBtnConfirm();
      })
    }
  }

  fnmergePNHtoCTCN(pnh: Phieunhaphang): Phieunhaphang {
    let ctcn: Phieunhaphang = {
        stt: 0,
        idchuyenngoai: null,
        soID : pnh.soID,
        tenhang : pnh.tenhang!,
        soluong : pnh.soluong!,
        soluongthucte: pnh.soluongthucte,
        trongluong : pnh.trongluong!,
        khoiluong : pnh.khoiluong!,
        donvitinh : pnh.donvitinh!,
        diadiembochang : pnh.diadiembochang!,
        tiencuoc : pnh.tiencuoc!,
        status02 : pnh.status02 == undefined? 0 : pnh.status02,
        status03 : pnh.status03 == undefined? 0 : pnh.status03,
        iduser : pnh.iduser!,
        hinhthucthanhtoan : pnh.hinhthucthanhtoan!,
        sdtnguoinhan : pnh.sdtnguoinhan!,
        tennguoinhan : pnh.tennguoinhan!,
        diachinguoinhan : pnh.diachinguoinhan!,
        ghichu : pnh.ghichu,
        cpdvtncd: pnh.cpdvtncd,
        id: pnh.id,
        ngaynhapthucte: pnh.ngaynhapthucte
    };

    return ctcn;
  }

  tongcptnPNH(cpdvtncd: ChiPhiDVTN): number {
    let tongtiendvtn = 0;
    tongtiendvtn = tongtiendvtn + cpdvtncd.sotienbocxep!  + cpdvtncd.sotiennhaphang! + cpdvtncd.sotientrahang! + cpdvtncd.sotienxecau!;
    return tongtiendvtn;
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


  edit(id: string,stt: number,soID: string,tenhang: string,iduser:string,diadiembochang:string,soluong:number,trongluong:number,khoiluong:number,tiencuoc:number,donvitinh:string, status02:number,hinhthucthanhtoan:string,tennguoinhan:string,sdtnguoinhan:string,diachinguoinhan:string,ghichu:string,status03:number):void {
    let item : Phieunhaphang = {
       id: id,
       stt: stt,
       soID: soID,
       tenhang: tenhang,
       iduser: iduser,
       diadiembochang: diadiembochang,
       soluong: soluong,
       trongluong: trongluong,
       khoiluong: khoiluong,
       tiencuoc: tiencuoc,
       donvitinh: donvitinh,
       status02: status02,
       hinhthucthanhtoan: hinhthucthanhtoan + "",
       tennguoinhan: tennguoinhan,
       sdtnguoinhan: sdtnguoinhan,
       diachinguoinhan: diachinguoinhan,
       ghichu: ghichu,
       status03: status03
    };
    soID != "" ? this.updatePNHFromKho(item) : this.updatePNHNew(item);
  }

  // showupdate phiếu nhập hàng tạo mơi
  updatePNHNew(pnh: Phieunhaphang) :void {
    this.subwinCtChuyenngoaiService.show({ nzTitle: 'Cập nhật' }, pnh).subscribe(({ modalValue, status }) => {
      if (status === ModalBtnStatus.Cancel) {
        return;
      }
      this.tableLoading(true);
      modalValue.stt = pnh.stt;
      this.mergeUpdateList(modalValue);
      this.getDataList();
      this.message.info("Click Confirm để hoàn thành cập nhật ");
    })
  }

  // show update phiêu nhâp hàng từ kho
  updatePNHFromKho(pnh: Phieunhaphang): void {
    pnh.status04 = 1;// cờ update từ kho
    this.subwinCtChuyenngoaiService.show({nzTitle: 'Cập nhật'},pnh).subscribe(({ modalValue, status }) => {
      if (status === ModalBtnStatus.Cancel) {
        return;
      }
      this.updateListID(modalValue['stt'],modalValue['status02'],modalValue['status03']);
      this.getDataList();
      this.message.info("Click Confirm để hoàn thành cập nhật ");
    })
  }

  del(stt: number) {
    this.modalSrv.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa nó không?',
      nzContent: 'Không thể phục hồi sau khi xóa',
      nzOnOk: () => {
        this.tableLoading(true);
        for(let element of this.dataList) {
          if(element.stt === stt && element.soID) {
            element.strrsrv10 = "HUY";
            this.listIDHuy.push(element);
          }
        }
        console.log(this.listIDHuy);
        this.listID = this.listID.filter(item => item['stt'] !== stt);
        this.dataList = [...this.listID];
        this.showBtnConfirm();
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

  // xóa tất cả dư liệu trên màn hình
  allDel() {
    this.chuyenngoaiDto.clear();
    this.headerForm.reset();
    this.dataList = [];
    this.listID = [];
    this.getDataList();
  }

  addListDetail() {
    if(this.ctchuyenngoai){
       this.listID = this.listID.concat(this.ctchuyenngoai);
    }
  }

  mergeDetail(ctdetail: Phieunhaphang) {
    let stt: number = 0;
    let n = this.listID.length;
    if (n == 0) {
       stt = 1;
    } else {
      let sttthn = this.listID[n-1].stt;
      if(sttthn && sttthn > 0) {
        stt = sttthn + 1;
      }
    }
    this.ctchuyenngoai = ctdetail;
    this.ctchuyenngoai.stt = stt;
    this.ctchuyenngoai.cpdvtncd = undefined;
    return this.ctchuyenngoai;
  }

  mergeUpdateList(ctdetail: any) {
    for(let element of this.listID) {
      if(element.stt == ctdetail.stt) {
        element.tenhang = ctdetail['tenhang'];
        element.soluong = ctdetail['soluong'];
        element.trongluong = ctdetail['trongluong'];
        element.khoiluong = ctdetail['khoiluong'];
        element.donvitinh = ctdetail['donvitinh'];
        element.diadiembochang = ctdetail['diadiembochang'];
        element.ghichu = ctdetail['ghichu'];
        element.iduser = ctdetail['iduser']
        element.hinhthucthanhtoan = ctdetail['hinhthucthanhtoan'];
        element.sdtnguoinhan = ctdetail['sdtnguoinhan'];
        element.tennguoinhan = ctdetail['tennguoinhan'];
        element.diachinguoinhan = ctdetail['diachinguoinhan'];
        element.tiencuoc = ctdetail['tiencuoc'];
        element.status02 = ctdetail['status02'];
        element.status03 = ctdetail['status03'];
        element.cpdvtncd = ctdetail['cpdvtncd'];
        element.soID = ""
      }
    }
  }

  updateListID(stt: number, status02: number, status03:number) : void {
    for(let element of this.listID) {
      if(element.stt === stt) {
        if(element.status02 != status02 || element.status03 != status03) {
          element.strrsrv10 = "UPDATE";
          let check = false;
          for(let e of this.listIDUpdate) {
            if(e.soID == element.soID) {
              check = true;
              e.status02 = status02;
              e.status03 = status03;
              break;
            }
          }
          if(check === false) {
            this.listIDUpdate.push(element);
          }
        }
        element.status02 = status02;
        element.status03 = status03;
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
          title: "Số ID",
          width: 150,
          field: 'soID'
        },
        {
          title: 'Tên hàng',
          field: 'tenhang',
          width: 280,
          tdTemplate: this.tenhangTpl
        },
        {
          title: 'Địa điểm bốc hàng',
          width: 280,
          field: 'diadiembochang',
          tdTemplate: this.diadiembochangTpl
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
          width: 120,
          field: 'tiencuoc',
          tdTemplate: this.tiencuocTpl
        },
        {
          title: "CP Dịch vu thuê ngoài",
          width: 160,
          field: "cpdvtncd",
          tdTemplate: this.chiphidvtnTpl
        },
        {
          title: 'Tiền thuê xe ngoài',
          width: 250,
          field: 'status02',
          tdTemplate: this.tiencuocxengoaiTpl
        },
        {
          title: 'HTTT khách hàng',
          width: 200,
          field: 'hinhthucthanhtoan',
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
