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
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Phieunhaphang } from '@app/core/model/phieunhaphang.model';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ModalBtnStatus } from '@app/widget/base-modal';
import { Spin00251subService } from '@app/widget/modal/trongkho/spin00251sub/spin00251sub.service';
import { Spin00251subkhachhangService } from '@app/widget/modal/trongkho/spin00251subkhachhang/spin00251subkhachhang.service';
import { Spin00251Service } from '@app/core/services/http/trongkho/spin00251.service';
import { Spin00251dtoService } from '@app/core/services/http/trongkho/spin00251dto/spin00251dto.service';
import _ from "lodash"
import { SubcommonsoidService } from '@app/widget/modal/common/subcommonsoid/subcommonsoid.service';

@Component({
  selector: 'app-spin00251',
  templateUrl: './spin00251.component.html',
  styleUrls: ['./spin00251.component.less']
})


export class Spin00251Component extends BaseComponent implements OnInit {
  headerForm!: FormGroup;
  
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '',
    breadcrumb: ['', '', '']
  };

  //searchParam: Partial<SearchParam> = {};
  dateFormat = Const.dateFormat;
  tableConfig!: MyTableConfig;
  dataList: any[] = [];
  backupdatalst: Phieunhaphang[] = [];
  checkedCashArray: any[] = [];
  ActionCode = ActionCode;


  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('tiencuocTpl', { static: true }) tiencuocTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('tenhangTpl', { static: true }) tenhangTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('ghichuTpl', { static: true }) ghichuTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('soluongTpl', { static: true }) soluongTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('trongluongTpl', { static: true }) trongluongTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('khoiluongTpl', { static: true }) khoiluongTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('donvitinhTpl', { static: true }) donvitinhTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('makhoTpl', { static: true }) makhoTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('diadiembochangTpl', { static: true }) diadiembochangTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('sdtnguoinhanTpl', { static: true }) sdtnguoinhanTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('tennguoinhanTpl', { static: true }) tennguoinhanTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('diachinguoinhanTpl', { static: true }) diachinguoinhanTpl!: TemplateRef<NzSafeAny>;
  showreturnBack = false;

  usernm = "";
  stockuser = "";
  showConfirm = false;
  btnConfirm = true;
  showbtnCopy = false;

  btnNew = false;

  btnnewOrder = false;
  
  backMH = "";
  backurl = "";

  listdetail: Phieunhaphang[] = [];
  pnh!: Phieunhaphang;

  override fnInit() {

    this.pageHeaderInfo = {
      title: this.formItemNm[3],
      breadcrumb: [this.formItemNm[1], this.formItemNm[2],this.formItemNm[3]],
      desc: ''
    };
    this.initTable();

    if(this.spin00251dtoService.initFlg == false) {
      this.headerForm = this.createForm();
      let reqheader = {
        "soID": this.spin00251dtoService.soID,
        "iduser": this.spin00251dtoService.iduser,
        "hinhthucthanhtoan": this.spin00251dtoService.hinhthucthanhtoan + "",
        "ghichu": this.spin00251dtoService.ghichu
      }
      this.usernm = this.spin00251dtoService.usernm;
      this.headerForm.patchValue(reqheader);
      this.listdetail = [...this.spin00251dtoService.listsp];
     
      let stt = 1;
      for(let element of this.listdetail) {
        element.stt = stt;
        stt++;
      }
      this.fnBackuplist(this.listdetail);
      this.getDataList();
      this.showBtnConfirm();
      this.showbtnCopy = true;
      this.showreturnBack = true;
      this.backMH = this.spin00251dtoService.mode;
      this.backurl = this.spin00251dtoService.backurl;
      //this.spin00251dtoService.clear();
    } else {
      this.headerForm = this.createForm();
    }
  }

  fnBackuplist(list:Phieunhaphang[]) {
    this.backupdatalst = [];
    //this.backupdatalst = list.slice();
    for(let element of list) {
      let item: Phieunhaphang = {};
      item.soID = element.soID;
      item.idchuyen = element.idchuyen;
      item.biensoxe = element.biensoxe;
      item.iduser = element.iduser;
      item.tiencuoc = element.tiencuoc;
      item.lotrinh = element.lotrinh;
      item.ngaynhap = element.ngaynhap;
      item.tenhang= element.tenhang;
      item.soluong = element.soluong;
      item.trongluong = element.trongluong;
      item.khoiluong = element.khoiluong;
      item.donvitinh = element.donvitinh;
      item.diadiembochang = element.diadiembochang;
      item.tennguoinhan = element.tennguoinhan;
      item.sdtnguoinhan = element.sdtnguoinhan;
      item.diachinguoinhan = element.diachinguoinhan;
      item.makho = element.makho;
      item.hinhthucthanhtoan = element.hinhthucthanhtoan;
      item.ghichu = element.ghichu;
      item.trangthai = element.trangthai
      item.status01 = element.status01;
      item.status02 = element.status02;
      item.status03 = element.status03;
      item.status04 = element.status04;
      item.status05 = element.status05;
      item.id = element.id;
      item.stt = element.stt
      this.backupdatalst.push(item);
    }
  }

  override destroy() {
   // this.spin00251dtoService.clear();
  }
  override DisplayScreenID: UrlDisplayId = UrlDisplayId.spin00251;

  constructor(
    protected override webService: WebserviceService,
    protected override router: Router,
    protected override cdf :  ChangeDetectorRef,
    protected override  datePipe : DatePipe,
    protected override tabService: TabService,
    protected override modalVideoyoutube: VideoyoutubeService,
    public message: NzMessageService,
    private modalSrv: NzModalService,
    private fb: FormBuilder,
    private spin00251subService: Spin00251subService,
    private spin00251subkhachhangService: Spin00251subkhachhangService,
    private dataService: Spin00251Service,
    private spin00251dtoService: Spin00251dtoService,
    private modalListSoIDService: SubcommonsoidService,
  ) { 
    super(webService,router,cdf,datePipe,tabService,modalVideoyoutube);
  }

  submitForm() {

  }

  fnNewOrder() {
    this.spin00251dtoService.clear();
    this.headerForm = this.createForm();
    this.dataList = [];
    this.listdetail = [];
    this.usernm = "";
    this.btnnewOrder = false;
    this.showbtnCopy = false;
    this.showBtnConfirm()
  }

  createForm() {
    return this.fb.group({
      soID : [""],
      iduser: [null, [Validators.required]],
      hinhthucthanhtoan: ["1", [Validators.required]],
      ghichu: [""]
    })
  }

  fnFocusOutUser() {
    if(this.headerForm.value.iduser != this.stockuser) {
      this.usernm = "";
    }
  }

  searchUserClick() {
    this.spin00251subkhachhangService.show({nzTitle: "Danh sách khách hàng"},{showcomfirm:false}).subscribe(
      res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        const param = { ...res.modalValue };
        this.headerForm.patchValue({
          iduser: param['id']
        })
        this.stockuser = param['id'];
        this.usernm = param['name'];

      }
    )
  }

  fnBtnConfirm() {
    if(this.spin00251dtoService.initFlg == false) {
      // update
      if(this.fnCheckChange() == true){
         this.modalSrv.info({nzTitle: "Chưa có thay đổi"})
      } else {
        // update
        let req = {
          "spin00251Header": this.headerForm.getRawValue(),
          "listsp": this.dataList,
          "mode": "update"
        }
        this.dataService.update(req)
        .pipe()
        .subscribe(res => {
          if(res==0) {
            this.modalSrv.success({nzTitle: "Thực hiện thành công !"});
            this.btnnewOrder = true;
            this.btnConfirm = false;
            this.showbtnCopy = true;
          } else {
            this.modalSrv.success({nzTitle: "Đơn hàng này không tồn tại !"});
          }
        })
      }
      
    } else {
      // create
      let req = {
        "iduser": this.headerForm.value.iduser,
        "hinhthucthanhtoan": this.headerForm.value.hinhthucthanhtoan,
        "ghichu": this.headerForm.value.ghichu,
        "listsp": this.dataList
      }
      this.dataService.register(req)
      .pipe()
      .subscribe(res => {
        if(res) {
          if(res['header']) {
            let reqheader = {
              "soID": res['header']['soID'],
              "iduser": res['header']['iduser']['id'],
              "hinhthucthanhtoan": res['header']['hinhthucthanhtoan'] + "",
              "ghichu": res['header']['ghichu']
            }
            this.usernm = res['header']['iduser']['name'];
            this.headerForm.patchValue(reqheader);
          }
         
          this.listdetail = [...res['listsp']];
          let stt = 1;
          for(let element of this.listdetail) {
            element.stt = stt;
            stt++;
          }
          this.fnBackuplist(this.listdetail);
          this.getDataList();
          this.fnSendService();
          this.showbtnCopy = true;
          this.btnConfirm = false;
          this.showBtnConfirm();
          this.btnnewOrder = true;
          this.message.success("Đăng ký thành công");
        } else {
          this.message.success("Đăng ký thất bại");
        }
      })
    }
  }

  fnSendService() {
    this.spin00251dtoService.initFlg = false;
    this.spin00251dtoService.iduser = this.headerForm.value.iduser;
    this.spin00251dtoService.usernm = this.usernm;
    this.spin00251dtoService.soID = this.headerForm.value.soID;
    this.spin00251dtoService.hinhthucthanhtoan = this.headerForm.value.hinhthucthanhtoan;
    this.spin00251dtoService.listsp = this.dataList;
    this.spin00251dtoService.ghichu = this.headerForm.value.ghichu;
  }

  fnCheckChange() {
    let headerForm = this.headerForm.getRawValue();
    let headerService = {
      "soID": this.spin00251dtoService.soID,
      "iduser" : this.spin00251dtoService.iduser,
      "hinhthucthanhtoan": this.spin00251dtoService.hinhthucthanhtoan + "",
      "ghichu": this.spin00251dtoService.ghichu
    }

    if(_.isEqual(headerForm,headerService)){
        if(_.isEqual(this.dataList,this.backupdatalst)){
           return true;
        } else {
          return false;
        }
    } else {
        return false;
    }
  }

  fnBtnCopy() {
    this.spin00251dtoService.clear();
    this.headerForm.patchValue({
      soID : "",
    });
    this.showbtnCopy = false;
    this.btnnewOrder = false;
    this.btnConfirm = true;

    this.message.info("Sao chép thành công !");
  }

  add() {
    this.spin00251subService.show({nzTitle: "Thêm mới"}).subscribe(
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

  showBtnConfirm() {
    if(this.dataList.length == 1) {
      this.btnNew = true;
      this.showConfirm = true;
    } else {
      this.showConfirm = false;
      this.btnNew = false;
    }
  }

  addListDetail() {
    if(this.pnh){
       this.listdetail = this.listdetail.concat(this.pnh);
    }
  }

  mergeDetail(pndetail: any) {
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
    this.pnh = pndetail;
    this.pnh.stt = stt;
    return this.pnh;
  }

  mergeUpdateList(ctdetail: any) {
    for(let element of this.listdetail) {
      if(element.stt == ctdetail.stt) {
        element.tenhang = ctdetail['tenhang'];
        element.tiencuoc = ctdetail['tiencuoc'];
        element.soluong = ctdetail['soluong'];
        element.trongluong = ctdetail['trongluong'];
        element.khoiluong = ctdetail['khoiluong'];
        element.donvitinh = ctdetail['donvitinh'];
        element.makho = ctdetail['makho'];
        element.diadiembochang = ctdetail['diadiembochang'];
        element.sdtnguoinhan = ctdetail['sdtnguoinhan'];
        element.tennguoinhan = ctdetail['tennguoinhan'];
        element.diachinguoinhan = ctdetail['diachinguoinhan'];
        element.ghichu = ctdetail['ghichu'];

        element.nguonxenhaphang = ctdetail['nguonxenhaphang'];
        element.sotiennhaphang =  ctdetail['sotiennhaphang'];
        element.htttnhaphang =  ctdetail['htttnhaphang'];
        element.tentaixenhaphang =   ctdetail['tentaixenhaphang'];
        element.biensoxenhaphang =  ctdetail['biensoxenhaphang'];

        element.nguonxetrahang = ctdetail['nguonxetrahang'];
        element.sotientrahang = ctdetail['sotientrahang'];
        element.httttrahang = ctdetail['httttrahang'];
        element.tentaixetrahang = ctdetail['tentaixetrahang'];
        element.biensoxetrahang = ctdetail['biensoxetrahang'];
  
        element.xecau = ctdetail['xecau'];
        element.sotienxecau = ctdetail['sotienxecau'];
        element.htttxecau = ctdetail['htttxecau'];
  
        element.bocxep = ctdetail['bocxep'];
        element.sotienbocxep = ctdetail['sotienbocxep'];
        element.htttbocxep = ctdetail['htttbocxep'];
      }
    }
  }

  allDel() {

  }

  edit(stt:any) {
    let res : any;
    for (let element of this.dataList) {
      if(element["stt"] === stt) {
        res = element;
      }
    }
    this.spin00251subService.show({ nzTitle: 'Cập nhật' }, res).subscribe(({ modalValue, status }) => {
      if (status === ModalBtnStatus.Cancel) {
        return;
      }
      this.tableLoading(true);
      modalValue.stt = stt;
      this.mergeUpdateList(modalValue);
      this.getDataList();
      this.message.info("Click Confirm để hoàn thành cập nhật ");
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
        this.showBtnConfirm();
        this.tableLoading(false);
      }
    });
  }

  reloadTable() {

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
          title: 'Tên hàng',
          width: 450,
          field: 'tenhang',
          tdTemplate: this.tenhangTpl
        },
        {
          title: 'Số lượng',
          field: 'soluong',
          width: 80,
          tdTemplate: this.soluongTpl
        },
        {
          title: 'Trọng lượng',
          field: 'trongluong',
          width: 80,
          tdTemplate: this.trongluongTpl
        },
        {
          title: 'khối lượng',
          field: 'khoiluong',
          width: 80,
          tdTemplate: this.khoiluongTpl
        },
        {
          title: 'Tiền cước',
          width: 100,
          field: 'tiencuoc',
          tdTemplate: this.tiencuocTpl
        },
        {
          title: 'Mã kho',
          width: 150,
          field: 'makho',
          tdTemplate: this.makhoTpl
        },
        {
          title: 'Địa điểm bóc hàng',
          width: 300,
          field: 'diadiembochang',
          tdTemplate: this.diadiembochangTpl
        },
        {
          title: 'Tên người nhận',
          width: 250,
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
          title: 'Địa chỉ người nhận',
          width: 350,
          field: 'diachinguoinhan',
          tdTemplate: this.diachinguoinhanTpl
        },
        {
          title: 'Ghi chú',
          width: 450,
          field: 'ghichu',
          tdTemplate: this.ghichuTpl
        },
        {
          title: 'Hành động',
          tdTemplate: this.operationTpl,
          width: 200,
          fixed: true,
          fixedDir: 'right'
        }
      ],
      total: 0,
      loading: true,
      pageSize: 10,
      pageIndex: 1,
      yScroll: 400
    };
  }

}
