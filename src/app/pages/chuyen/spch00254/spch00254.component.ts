import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlDisplayId } from '@app/common/UrlDisplay';
import { TabService } from '@app/core/services/common/tab.service';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import { BaseComponent } from '@app/pages/system/base/base.component';
import * as Const from "src/app/common/const";
import { ActionCode } from '@app/config/actionCode';
import { OptionsInterface } from '@app/core/services/types';
import { MyTableConfig } from '@app/shared/components/ant-table/ant-table.component';
interface SearchParam {
  ngaybatdau: string | null;
  ngayketthuc: string | null;
  nguonxe : string;
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

  constructor(
    protected override webService: WebserviceService,
    protected override router: Router,
    protected override cdf :  ChangeDetectorRef,
    protected override  datePipe : DatePipe,
    protected override tabService: TabService,
  ) {
    super(webService,router,cdf,datePipe,tabService);
   }

   searchParam: Partial<SearchParam> = {};
   dateFormat = Const.dateFormat;
   tableConfig!: MyTableConfig;
   dataList: any[] = [];
   checkedCashArray: any[] = [];
   ActionCode = ActionCode;
   availableOptions: OptionsInterface[] = [];
   
  override ngOnInit(): void {
    this.initTable();
  }

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: false,
      headers: [
        {
          title: 'Mã hóa đơn',
          field: 'iddonhang',
          width: 250,
        },
        {
          title: 'Nguồn Xe',
          width: 300,
          field: 'nguonxe',
        },
        {
          title: 'Ngày phát hành',
          width: 250,
          field: 'ngaynhap',
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
          title: 'Số tiền ',
          width: 200,
          field: 'sotienno',
        },
        {
          title: 'Ghi chú',
          width: 450,
          field: 'ghichu'
        }
      ],
      total: 0,
      loading: true,
      pageSize: 10,
      pageIndex: 1
    };
  }

}
