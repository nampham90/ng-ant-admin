import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ValidationFormService } from '@app/core/services/common/message-errors.service';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import { NguonxeService } from '@app/core/services/http/nguonxe/nguonxe.service';
import { SearchCommonVO } from '@app/core/services/types';
import { ValidatorsService } from '@app/core/services/validators/validators.service';
import { MyTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { finalize } from 'rxjs';
import { ModalBtnStatus } from '@app/widget/base-modal';
interface SearchParam {
  datacd: string;
}
@Component({
  selector: 'app-subwindowsearchnguonxe',
  templateUrl: './subwindowsearchnguonxe.component.html',
  styleUrls: ['./subwindowsearchnguonxe.component.less']
})
export class SubwindowsearchnguonxeComponent implements OnInit {

  tableConfig!: MyTableConfig;
  dataList: any[] = [];
  params!: Object;
  dataResponse: NzSafeAny = {}
  messageErrors: any = [];
  searchParam: Partial<SearchParam> = {};
  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private webService: WebserviceService,
    public vf: ValidationFormService,
    public message: NzMessageService,
    private cdr: ChangeDetectorRef,
    private modalRef: NzModalRef,
    private dataService: NguonxeService
  ) { }

  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<any>;

  ngOnInit(): void {
    this.initTable();
  }

  tableChangeDectction(): void {
    this.dataList = [...this.dataList];
    this.cdr.detectChanges();
  }

  tableLoading(isLoading: boolean): void {
    this.tableConfig.loading = isLoading;
    this.tableChangeDectction();
  }

  getDataList(e?: NzTableQueryParams): void {
    this.tableConfig.loading = true;
    const params: SearchCommonVO<any> = {
      pageSize: this.tableConfig.pageSize!,
      pageNum: e?.pageIndex || this.tableConfig.pageIndex!,
      filters: this.searchParam
    };
    this.dataService
      .postAll(params)
      .pipe(
        finalize(() => {
          this.tableLoading(false);
        })
      )
      .subscribe(data => {
        const { list, total, pageNum } = data;
        this.dataList = [...list];
        this.tableConfig.total = total!;
        this.tableConfig.pageIndex = pageNum!;
        this.tableLoading(false);
      });
  }

  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
  }

  resetForm(): void {
    this.searchParam = {};
    this.getDataList();
  }
  reloadTable(): void {
    this.message.info('Làm mới thành công');
    this.getDataList();
  }
  
  getItem(id:string, datacd:string) {
    this.dataResponse = {
      id: id,
      datacd: datacd
    }
    this.modalRef.destroy({ status: ModalBtnStatus.Ok, modalValue:this.dataResponse });
  }

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: false,
      headers: [
        {
          title: 'ID nguồn xe',
          field: 'datacd',
          width: 150,
          tdTemplate: this.operationTpl
        },
        {
          title: 'Tên nguồn xe',
          width: 300,
          field: 'datanm'
        },
        {
          title: 'Số điện thoại',
          width: 200,
          field: 'sodienthoai'
        },
        {
          title: 'Địa chỉ',
          width: 200,
          field: 'diachi'
        },
        {
          title: 'Thông tin thanh toán 1',
          width: 500,
          field: 'thongtinthanhtoan1'
        },
        {
          title: 'Thông tin thanh toán 1',
          width: 500,
          field: 'thongtinthanhtoan2'
        }
      ],
      total: 0,
      loading: true,
      pageSize: 10,
      pageIndex: 1
    };
  }

}
