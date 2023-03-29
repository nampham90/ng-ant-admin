import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { TaixeService } from '@app/core/services/http/taixe/taixe.service';
import { Chuyen } from '@app/core/model/chuyen.model';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { BaseComponent } from '@app/pages/system/base/base.component';
import { UrlDisplayId } from '@app/common/UrlDisplay';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { TabService } from '@app/core/services/common/tab.service';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import { SubwindowChiphiService } from '@app/widget/modal/subwindowchiphi/subwindow-chiphi.service';
import { SubwindowProductService } from '@app/widget/modal/subwindowproduct/subwindow-product.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ChiphichuyenService } from '@app/core/services/http/chiphichuyen/chiphichuyen.service';
import { ChuyenService } from '@app/core/services/http/chuyen/chuyen.service';
import { PhieunhaphangService } from '@app/core/services/http/phieunhaphang/phieunhaphang.service';
import { ChuyendtoService } from '@app/core/services/http/chuyen/chuyendto.service';
import { ModalBtnStatus } from '@app/widget/base-modal';
import { finalize } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { VideoyoutubeService } from '@app/widget/modal/subwindowvideoyoutube/videoyoutube.service';

export interface Product {
  id?:string,
  stt?: number;
  idkhachhang?: string;
  tenkhachhang?: string;
  noidungmathang?: string;
  tiencuoc?: number;
  diadiembochang?: string;
  hinhthucthanhtoan?: any;
  lotrinh?: any;
  ghichu?:string;
  trangthai?: number;
  tennguoinhan?:string;
  sdtnguoinhan?:string;
  diachinguoinhan?:string;
} 
@Component({
  selector: 'app-mbtx00101',
  templateUrl: './mbtx00101.component.html',
  styleUrls: ['./mbtx00101.component.less']
})
export class Mbtx00101Component extends BaseComponent implements OnInit {
  fnInit() {
   
  }
  destroy() {
   
  }
  DisplayScreenID: UrlDisplayId =UrlDisplayId.mbtx00101;

  @ViewChild('hangdi', { static: true }) hangdi: ViewChild | any;
  @ViewChild('hangve', { static: true }) hangve: ViewChild | any;

  lsthangdi: any[] = [];
  lsthangve: any[] = [];

  listchiphi: any[] = [];
  chuyen: NzSafeAny;
  thumbStyle = {
    width: '32px',
    height: '32px',
    "border-radius" : "50px"
  };

  steps: any[]= [];
  current = 0;

  onChange(event: any) {
    //console.log(event);
  }
  constructor(
    protected override webService: WebserviceService,
    protected override router: Router,
    protected override cdf :  ChangeDetectorRef,
    protected override  datePipe : DatePipe,
    protected override tabService: TabService,
    protected override modalVideoyoutube: VideoyoutubeService,
    private dataService : TaixeService,
    private modashowProduct: SubwindowProductService,
    private modalChiphiService: SubwindowChiphiService,
    private modalSrv: NzModalService,
    private chuyenService: ChuyenService,
    private phhService: PhieunhaphangService,
    private cpcService: ChiphichuyenService,
    public ChuyenDto: ChuyendtoService,
    public message: NzMessageService,
  ) {
    super(webService,router,cdf,datePipe,tabService,modalVideoyoutube);
   }

  override ngOnInit(): void {
    this.requestInit();
    this.steps = [
      {
        title: 'Chuẩn bị bóc hàng',
        description: 'This is description',
      },
      {
        title: 'Đã bóc',
        description: 'This is description',
      },
      {
        title: 'Đã trả',
        description: 'This is description',
      },
    ];
    this.cdf.markForCheck();
  }

  // request Init 
  requestInit() {
    let req = {
      "mode" : "app"
    }
    this.dataService.getInitTaiXe(req)
    .pipe()
    .subscribe(res => {
       this.chuyen = res.resdataChuyen;
       this.fnChuyenToService(res.resdataChuyen);
       this.lsthangdi = res.reslistHangdi;
       this.lsthangve = res.reslistHangve;
       this.cdf.markForCheck();
    })
  }

  fnChuyenToService(reschuyen: any) {
    this.ChuyenDto.initFlg = false;
    this.ChuyenDto.id = reschuyen["id"];
    this.ChuyenDto.biensoxe = reschuyen['biensoxe']['biensoxe'];
    this.ChuyenDto.tienxe = reschuyen['tienxe'];
    this.ChuyenDto.trangthai = reschuyen['trangthai'];
  }

  // add product
  add() {
    this.modashowProduct.show({ nzTitle:'Thêm mới' }).subscribe( //  this.formItemNm[15]
      res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        res.modalValue['trangthai'] = 0;
        res.modalValue['biensoxe'] = this.ChuyenDto.biensoxe;
        res.modalValue['idchuyen'] = this.ChuyenDto.id;
        this.addEditData(res.modalValue,'create');
      },
    );
  }

  addEditData(param: Product, methodName: 'update' | 'create'): void {
    this.phhService[methodName](param)
    .pipe(
      finalize(() => {

      })
    )
    .subscribe(() => {
       // reload component;
       this.requestInit();
    }); 
  }

  chiphi() {
    let req = {
      id: this.ChuyenDto.id
    }
    this.cpcService.getlists(req).pipe().subscribe(res => {
      this.listchiphi = res;
      if (this.listchiphi.length > 0) {
        // show modal update chi phí
        this.modalChiphiService.show({ nzTitle: 'Cập nhật danh sách chi phí' }, {listcp:this.listchiphi}).subscribe(({ modalValue, status }) => {
          if (status === ModalBtnStatus.Cancel) {
            return;
          }
          let req1 = {
            id: req.id,
            lstchiphi: modalValue.items
          }
          this.dataService.UpdateChiphiProcess(req1).pipe().subscribe(res => {
              if(res == req1.lstchiphi.length) {
                this.message.info("Cập nhật thành công !");
              } else {
                this.message.info("Cập nhật 1 phần !");
              }
          })
        });
      } else {
        // show modal tính chi phí
        this.modalChiphiService.show({ nzTitle: 'Danh sách chi phí' }, {idchuyen:req.id}).subscribe(({ modalValue, status }) => {
          if (status === ModalBtnStatus.Cancel) {
            return;
          }
          let req1 = {
            id: req.id,
            lstchiphi: modalValue.items
          }
          this.dataService.InsertChiphiProcess(req1).pipe().subscribe(res => {
            if (res == 1) {
               this.message.success(" Thực hiện thành công !");
            } else {
               this.message.success(" Không thành công !");
            }
          })
        });
      }
    })
  }

  updateStatus01(id: string) {
    this.modalSrv.confirm({
      nzTitle: "Bạn chắc chắn đã giao hàng cho khách ?",
      nzContent: "Nhấn Ok để tiếp tục",
      nzOnOk: () => {
        this.dataService.updateStatus01({id: id}).pipe()
        .subscribe(res => {
          this.requestInit();
        })
      }
    })
  }


  copy(soodt: any) {
    return `${soodt}`;
  }

}
