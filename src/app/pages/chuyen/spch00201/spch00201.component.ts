import { DatePipe } from '@angular/common';

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import { BaseComponent } from '@app/pages/system/base/base.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as Const from '@app/common/const';
import { MyTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { ActionCode } from '@app/config/actionCode';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';

import { SubwindowProductService } from '@app/widget/modal/subwindowproduct/subwindow-product.service';
import { ModalBtnStatus } from '@app/widget/base-modal';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ChuyendtoService } from '@app/core/services/http/chuyen/chuyendto.service';
import { ChuyenService } from '@app/core/services/http/chuyen/chuyen.service';
import { OptionsInterface, SearchCommonVO } from '@app/core/services/types';
import { MapKeyType, MapPipe, MapSet } from '@app/shared/pipes/map.pipe';

import { TabService } from '@app/core/services/common/tab.service';
import { DestroyService } from '@app/core/services/common/destory.service';
import { Phieunhaphang } from '@app/core/model/phieunhaphang.model';
import { PhieunhaphangService } from '@app/core/services/http/phieunhaphang/phieunhaphang.service';
import { UrlDisplayId } from '@app/common/UrlDisplay';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { finalize } from 'rxjs';
import { fnReload } from '@utils/tools';
import { ChiphichuyenService } from '@app/core/services/http/chiphichuyen/chiphichuyen.service';
import { SubwindowChiphiService } from '@app/widget/modal/subwindowchiphi/subwindow-chiphi.service';
import { LayoutPdfService } from '@app/core/services/common/layout-pdf.service';
import {VideoyoutubeService} from '@app/widget/modal/subwindowvideoyoutube/videoyoutube.service'
import { async } from '@antv/x6/lib/registry/marker/async';
import { Tmt030Service } from '@app/core/services/http/system/tmt030.service';

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

interface SearchParam {
  idchuyen : string;
}
@Component({
  selector: 'app-spch00201',
  templateUrl: './spch00201.component.html',
  styleUrls: ['./spch00201.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class Spch00201Component extends BaseComponent implements OnInit {
  DisplayScreenID: UrlDisplayId = UrlDisplayId.spch00201;
  reqPhieunhaphang : Phieunhaphang = {};

  fnInit() {
    this.cdf.markForCheck();
  }

  destroy() {
  }

  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Kế hoạch bóc hàng',
    breadcrumb: ["Home","Chuyến","Kế hoạch bóc hàng"],
    desc: ''
  };

  searchParam: Partial<SearchParam> = {};

  dateFormat = Const.dateFormat;
  tableConfig!: MyTableConfig;


  dataList: Product[] = [];
  checkedCashArray: any[] = [];
  listchiphi: any[] = [];
  ActionCode = ActionCode;
  showchuyen = true;
  showConfirm = false;
  tongcuoc = 0;
  availableOptions: OptionsInterface[] = [];

  btnNew = true;
  btnUpdate = true;
  btnDelete = false;

  btnConfirm = false;
  btnConfirmbochang = false;
  btnConfirmtrahang = false;
  btnConfirmchiphi = false;
  btnConfirmend = false;

  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('tiencuocTpl', { static: true }) tiencuocTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('htttTpl', { static: true }) htttTpl!: TemplateRef<NzSafeAny>;


  constructor(
    protected override webService: WebserviceService,
    protected override router: Router,
    protected override cdf :  ChangeDetectorRef,
    protected override  datePipe : DatePipe,
    protected override modalVideoyoutube: VideoyoutubeService,
    public message: NzMessageService,

    private modashowProduct: SubwindowProductService,
    private modalSrv: NzModalService,
    public ChuyenDto: ChuyendtoService,
    private dataService: ChuyenService,
    private phhService: PhieunhaphangService,
    private cpcService: ChiphichuyenService,
    private modalChiphiService: SubwindowChiphiService,
    protected override tabService: TabService,
    private pdfService: LayoutPdfService,
    private tmt030Service : Tmt030Service
    

  ) {
    super(webService,router,cdf,datePipe,tabService,modalVideoyoutube);
  }

  override ngOnInit(): void {
    this.initTable();

    this.fnshowConfirm(this.ChuyenDto.trangthai)
    if(this.ChuyenDto.id != "" && this.ChuyenDto.id.length == 24) {
      this.dataService.getChuyen(this.ChuyenDto.id).subscribe(res => {
        this.ChuyenDto.trangthai = res.trangthai!;
        this.fnshowConfirm(this.ChuyenDto.trangthai);
      })
      this.showchuyen = false;
      this.showConfirm = true;

    } else {
      this.ChuyenDto.clear();
      this.getDataList();
    }
    this.getTongcuoc();
    this.availableOptions = [...MapPipe.transformMapToArray(MapSet.available, MapKeyType.Boolean)];
  }

  fnshowConfirm(trangthai: number) {
    switch(trangthai) {
      case 0 : {
        this.btnConfirm = true;
        this.btnConfirmbochang = false;
        this.btnConfirmtrahang = false;
        this.btnConfirmchiphi = false;
        this.btnConfirmend = false;
      }; break;
      case 1 : {
        this.btnConfirm = false;
        this.btnConfirmbochang = true;
        this.btnConfirmtrahang = false;
        this.btnConfirmchiphi = false;
        this.btnConfirmend = false;
      }; break;
      case 2 : {
        this.btnConfirm = false;
        this.btnConfirmbochang = false;
        this.btnConfirmtrahang = true;
        this.btnConfirmchiphi = false;
        this.btnConfirmend = false;
      }; break;
      case 3 : {
        this.btnConfirm = false;
        this.btnConfirmbochang = false;
        this.btnConfirmtrahang = false;
        this.btnConfirmchiphi = true;
        this.btnConfirmend = false;
        this.btnNew = true;
        this.btnUpdate = true;
        this.btnDelete = false;
      }; break; 
      case 4 : {
        this.btnConfirm = false;
        this.btnConfirmbochang = false;
        this.btnConfirmtrahang = false;
        this.btnConfirmchiphi = true;
        this.btnConfirmend = true;
        this.btnNew = true;
        this.btnUpdate = true;
        this.btnDelete = false;
      }; break;
      case 5 : {
        this.btnConfirm = false;
        this.btnConfirmbochang = false;
        this.btnConfirmtrahang = false;
        this.btnConfirmchiphi = true;
        this.btnConfirmend = false;
        this.btnNew = true;
        this.btnUpdate = true;
        this.btnDelete = true;
      } 
    }
    this.cdf.markForCheck();
  }

  selectChuyen() {
     this.router.navigate([Const.rootbase + 'chuyen/spch00101']);
  }

  getTongcuoc() {
    let tc = 0;
    for(let element of this.dataList) {
      tc = tc + element.tiencuoc!;
    }
    this.tongcuoc = tc;
    this.cdf.markForCheck();
  }

  Confirm4() {
    if(this.ChuyenDto.trangthai == 5) {
      // show chi phi chuyen 
      let req = {
        id: this.ChuyenDto.id
      }
      this.cpcService.getlists(req).pipe().subscribe(res => {
        this.modalChiphiService.show({ nzTitle: 'Danh sách chi phí' }, {listcp:res,status:5,showcomfirm:false}).subscribe(({ modalValue, status }) => {
          if (status === ModalBtnStatus.Cancel) {
            return;
          }
        });
      })
    } else {
      this.fncheckchiphiChuyen();
    }
    // 1 check chuyến này có ai tinh chi phí chưa
    // nếu chưa. thì show tính chi phí
    // nếu có . thì update
  }

  fncheckchiphiChuyen() {
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
              trangthai: 4,
              lstchiphi: modalValue.items
            }
            this.cpcService.updateList(req1).pipe().subscribe(res => {
                if(res == req1.lstchiphi.length) {
                  this.message.info("Cập nhật thành công !");
                  this.ChuyenDto.trangthai=4;
                  this.fnshowConfirm(4);
                  // export file pdf
                  this.fnExportDataPDF(this.ChuyenDto.id);
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
              trangthai: 4,
              lstchiphi: modalValue.items
            }
            this.dataService.updateTrangthai(req1).pipe().subscribe(res => {
              if (res == 1) {
                 this.message.success(" Thực hiện thành công !");
                 this.ChuyenDto.trangthai=4;
                 this.fnshowConfirm(4);
                 // export file pdf
                 this.fnExportDataPDF(this.ChuyenDto.id);
              } else {
                 this.message.success(" Không thành công !");
              }
            })
          });
        }
    })
  }

  fnExportDataPDF(id: string) {
    this.phhService.ExportDataPDFChuyen(id)
    .subscribe(async res => {
      if(res) {
        // tinh tong cuoc
        let tc = this.fnTinhTongCuoc(res.lstproduct);
        // tong tien khach hàng nơ
        let tckn = this.fnTinhTongTienKHNo(res.lstproduct);
        // tinh tong chi phi
        let tcp = this.fnTinhtongchiphi(res.lstchiphi);

        let tiennop = tc - (tckn + tcp);

        let title = "Chứng từ hoàn thành chuyến - " + Const.doanhnghiep;
        let header = [['Khách hàng','Thông tin đơn hang','tiền cước','HTTT']];
        let data = this.fnGetDataExport(res.lstproduct);
        this.pdfService.clearHeader();
        let layoutheader = Const.headerLayout;
        layoutheader[0]['field'] = "Số ODT:";
        layoutheader[0]['value'] = res.odt;
        layoutheader[1]['field'] = "Biển số xe: ";
        layoutheader[1]['value'] = res['chuyen']['biensoxe']['biensoxe'];
        layoutheader[2]['field'] = "Tài chính: ";
        layoutheader[2]['value'] = res['chuyen']['idtai']['name'];
        layoutheader[3]['field'] = "Tài phụ:";
        layoutheader[3]['value'] = res['chuyen']['idphu']['name'];;
        layoutheader[4]['field'] = "Tổng cước:";
        layoutheader[4]['value'] = this.displayVND(tc);

        let layoutheader2 = Const.headerLayout2;
        layoutheader2[0]['field'] = "Ngày khởi hành:";
        layoutheader2[0]['value'] = this.formatDate(res['chuyen']['ngaydi']);
        layoutheader2[1]['field'] = "Tổng chi phi:";
        layoutheader2[1]['value'] = this.displayVND(tcp);
        layoutheader2[2]['field'] = "Khách Hàng Nợ:";
        layoutheader2[2]['value'] = this.displayVND(tckn);
        layoutheader2[3]['field'] = "";
        layoutheader2[3]['value'] = "";
        layoutheader2[4]['field'] = "Số Tiền Nộp:";
        layoutheader2[4]['value'] = this.displayVND(tiennop);
  
        // chi phi
        let headerchiphi = [['Tên chi phí', 'Số tiền chi','Ghi chú']];
        let datachiphi = this.fnGetDataExportChiPhi(res.lstchiphi);
        await this.pdfService.exportPDFChuyen(header,layoutheader,layoutheader2,data,headerchiphi,datachiphi,title,this.getDate(),"","Quản lý ký duyệt",res.odt);  
      }
    })
  }

  fnGetDataExport(lstdata:any) {
    let data: any[] = [];
    for(let element of lstdata){
      let item = [
        element['iduser']['name'],
        element['noidungdonhang'],
        this.displayVND(element['tiencuoc']),
        element['hinhthucthanhtoan']
      ];
      data.push(item);
    }
    return data;
  }

  fnTinhTongCuoc(lstdata:any)  {
    let tongcuoc = 0;
    for(let element of lstdata) {
      tongcuoc = tongcuoc + element['tiencuoc'];
    }
    return tongcuoc;
  }

  fnTinhTongTienKHNo(lstdata:any) {
    let tongcuockhno = 0 ;
    for(let element of lstdata) {
      if(element['hinhthucthanhtoan'] == 2){
        tongcuockhno = tongcuockhno + element['tiencuoc'];
      }   
    }
    return tongcuockhno;
  }

  fnGetDataExportChiPhi(lstchiphi: any) {
    let data: any[] = [];
    for(let element of lstchiphi) {
      let item = [
        element['tenchiphi'],
        this.displayVND(element['sotien']),
        element['ghichu'],
      ];
      data.push(item);
    }
    return data;
  }

  fnTinhtongchiphi(lstchiphi: any) {
    let tongcp = 0;
    for(let element of lstchiphi) {
      tongcp = tongcp + element['sotien'];
    }
    return tongcp;
  }

  // update trang thai chuyen hang
  Confirm(trangthai: number) {
     
     if (this.ChuyenDto.id != '' && this.ChuyenDto.id.length == 24) {
      let listKhachNo: Product[] = []
        let req = {
          id: this.ChuyenDto.id,
          trangthai: trangthai,
          listkhachno: listKhachNo
        }
        if(this.dataList.length > 0) {
          listKhachNo = this.fnGetListKhachNo();
          if(trangthai == 3) {
            req['listkhachno'] = listKhachNo
          }
          this.dataService.updateTrangthai(req).pipe().subscribe(res => {
            if (res == 1) {
               this.message.success(" Thực hiện thành công !");
               this.ChuyenDto.trangthai = trangthai;
               this.fnshowConfirm(this.ChuyenDto.trangthai);
              // fnReload(this.router, Const.rootbase + 'chuyen/spch00101');
            }else if(res == 0){
               this.modalSrv.info({nzTitle: "Tài xế chưa hoàn thành trả hàng !"})
            } else {
               this.message.success(" Không thành công !");
            }
         })
        } else {
          this.message.success(" Vui lòng thêm mặt hàng !");
        }
        
     }
  }

  // fnGet list khach nợ
  fnGetListKhachNo() {
     let listKhachNo = [];
     for(let element of this.dataList) {
       if(element.hinhthucthanhtoan == 2) {
          listKhachNo.push(element);
       }
     }
     return listKhachNo;
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
        this.tableLoading(true);
        this.addEditData(res.modalValue, 'create');
      },
      error => this.tableLoading(false)
    );
  }

  allDel() {

  }


  edit(id: any) {
    this.phhService.getDetail(id).subscribe(res => {
      let req = {
        "idchuyen": res.idchuyen,
        "biensoxe": res.biensoxe,
        "iduser": res.iduser,
        "tiencuoc": res.tiencuoc,
        "lotrinh": res.lotrinh,
        "ngaynhap": res.ngaynhap,
        "noidungdonhang": res.noidungdonhang,
        "diadiembochang": res.diadiembochang,
        "hinhthucthanhtoan": res.hinhthucthanhtoan + "",
        "ghichu": null,
        "trangthai": res.trangthai,
        "id": res.id,
        "tennguoinhan": res.tennguoinhan,
        "sdtnguoinhan":res.sdtnguoinhan,
        "diachinguoinhan": res.diachinguoinhan
      }
      this.modashowProduct.show({ nzTitle: 'Cập nhật' }, req).subscribe(({ modalValue, status }) => {
        if (status === ModalBtnStatus.Cancel) {
          return;
        }
        modalValue.id = id;
        this.tableLoading(true);
        this.addEditData(modalValue, 'update');
      }, error => this.tableLoading(false));
    })
  }

  del(id: any) {
    this.modalSrv.confirm({
      nzTitle: 'Bạn có chắc chắn muốn hủy bốc hàng?',
      nzContent: 'Nhấn Ok để xác nhận',
      nzOnOk: () => {
        this.tableLoading(true);
        this.phhService.delete(id).subscribe(
          (res) => {
            if(res == 1) {
              if (this.dataList.length === 1) {
                this.tableConfig.pageIndex--;
              }
              this.getTongcuoc();
            } else {
              this.modalSrv.info({nzTitle: res.msgError})
            }
            this.getDataList();
          },
          error => this.tableLoading(false)
        );
      }
    });
  }


  addEditData(param: Product, methodName: 'update' | 'create'): void {
    this.phhService[methodName](param)
    .pipe(
      finalize(() => {
        this.tableLoading(false);
      })
    )
    .subscribe(() => {
      this.getDataList();
      this.getTongcuoc();
    }); 
  }

  getDataList(e?: NzTableQueryParams) {
    this.tableConfig.loading = true;
    if(this.ChuyenDto.id != '') {
      this.searchParam.idchuyen = this.ChuyenDto.id;
      const params: SearchCommonVO<any> = {
        pageSize: this.tableConfig.pageSize!,
        pageNum: e?.pageIndex || this.tableConfig.pageIndex!,
        filters: this.searchParam
      };
      this.phhService.getlists(params)
      .pipe(
        finalize(() => {
          this.tableLoading(false);
        })
      )
      .subscribe(data => {
        const { list, total, pageNum } = data;
        let listProduct = this.listToProduct(list);
        this.dataList = [...listProduct];
        this.getTongcuoc();
        // if(this.dataList.length == 0) {
        //   this.modalSrv.info({ nzContent: 'Không Có dữ liệu',});
        // }
        this.tableConfig.total = total!;
        this.tableConfig.pageIndex = pageNum!;
        this.tableLoading(false);
        this.checkedCashArray = [...this.checkedCashArray];
      });
    } else {
      this.ChuyenDto.clear();
      this.dataList = [];
      this.tableLoading(false);
    }
   
  }

  listToProduct(list: any): Product[] {
    let listP: Product[] = [];
    if(list.length > 0) {
      let i = 0;
      for(let item of list) {
          let itemProduc: Product = {}
          itemProduc.id = item['id'];
          itemProduc.stt = (i+1);
          itemProduc.idkhachhang = item.iduser['_id'];
          itemProduc.tenkhachhang = item.iduser['name'];
          itemProduc.noidungmathang = item['noidungdonhang'];
          itemProduc.lotrinh = item['lotrinh'];
          itemProduc.diadiembochang = item['diadiembochang'];
          itemProduc.hinhthucthanhtoan = item['hinhthucthanhtoan'];
          itemProduc.tiencuoc = item['tiencuoc'];
          itemProduc.trangthai = item['trangthai'];
          itemProduc.ghichu = item['ghichu'];
          itemProduc.tennguoinhan = item['tennguoinhan'];
          itemProduc.sdtnguoinhan = item['sdtnguoinhan'];
          itemProduc.diachinguoinhan = item['diachinguoinhan'];
          i++;
          listP.push(itemProduc);
      }
    }
    return listP;
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
          title: 'Tên Khách Hàng',
          width: 170,
          field: 'tenkhachhang',
         // tdTemplate: this.Tltentai
        },
        {
          title: 'Nội dung bóc hàng',
          width: 450,
          field: 'noidungmathang',
          //tdTemplate: this.tiencuocTpl
        },
        {
          title: 'Tiền cước',
          width: 100,
          field: 'tiencuoc',
          tdTemplate: this.tiencuocTpl
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
        },
        {
          title: 'Hành động',
          tdTemplate: this.operationTpl,
          width: 90,
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
