import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { BaseComponent } from '@app/pages/system/base/base.component';
import { MyTableConfig } from '@app/shared/components/ant-table/ant-table.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidationFormService } from '@app/core/services/common/message-errors.service';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import { ValidatorsService } from '@app/core/services/validators/validators.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { SearchCommonVO } from '@app/core/services/types';
import * as Const from '@app/common/const'
import { AccountService, SmartUser, User } from '@app/core/services/http/system/account.service';
import { ModalBtnStatus } from '@app/widget/base-modal';
import { finalize } from 'rxjs';
import { SubwindowSmartKhachhangService } from '../../subwindowsmartkhachhang/subwindowsmartkhachhang.service';

interface SearchParam {
  phongban_id: string;
  makhachhang: string;
  dienthoai: string;
}
@Component({
  selector: 'app-spin00251subkhachhang',
  templateUrl: './spin00251subkhachhang.component.html',
  styleUrls: ['./spin00251subkhachhang.component.less']
})
export class Spin00251subkhachhangComponent implements OnInit {
  headerForm!: FormGroup;
  tableConfig!: MyTableConfig;
  dataList: User[] = [];
  params!: Object;
  dataResponse: NzSafeAny = {}
  messageErrors: any = [];
  searchParam: Partial<SearchParam> = {};
  smartUser!: SmartUser;
  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('availableFlag', { static: true }) availableFlag!: TemplateRef<NzSafeAny>;

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private webService: WebserviceService,
    public vf: ValidationFormService,
    public message: NzMessageService,
    private cdr: ChangeDetectorRef,
    private modalRef: NzModalRef,
    private dataService: AccountService,
    private subSmartKhachhangService: SubwindowSmartKhachhangService
  ) { }

  submitForm() {

  }

  reset() {
    this.searchParam = {};
    this.searchParam.phongban_id = Const.idKhachhang;
    this.getDataList();
  }

  generateRandomEmail(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let email = '';
    // Generate a random string of length 10 for the email
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      email += chars[randomIndex];
    }
    // Add a domain to the email
    email += '@gmail.com';
    return email;
  }

  addNew() {
    this.subSmartKhachhangService.show({nzTitle: "Thêm mới"}).subscribe(res => {
      if (!res || res.status === ModalBtnStatus.Cancel) {
        return;
      }
      let searchmkh = res.modalValue['makhachhang'];
      this.smartUser = {
        phongban_id: Const.idKhachhang,
        makhachhang: res.modalValue['makhachhang'],
        name: res.modalValue['name'],
        dienthoai: res.modalValue['dienthoai'],
        email: this.generateRandomEmail(),
        password: "a123456",
      }
      this.dataService.addSmartAccount(this.smartUser)
      .pipe(
        finalize(() => {
          this.tableLoading(false);
        })
      ).subscribe(res => {
         this.searchParam.makhachhang = searchmkh;
         this.getDataList();
         this.message.success("Thêm mới thành công !");
      }) 
    })
  }

  ngOnInit(): void {
    this.searchParam.phongban_id = Const.idKhachhang;
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
      .getAccount(params)
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
  
  getItem(id:string, name:string, dienthoai: string, diachi: string) {
    this.dataResponse = {
      id: id,
      name: name,
      sodienthoai: dienthoai,
      diachi: diachi
    }
    this.modalRef.destroy({ status: ModalBtnStatus.Ok, modalValue:this.dataResponse });
  }

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: false,
      headers: [
        {
          title: 'Mã Khách hàng',
          field: 'makhachhang',
          width: 220,
          //tdTemplate: this.operationTpl
        },
        {
          title: 'Tên khách hàng',
          field: 'name',
          width: 220,
          tdTemplate: this.operationTpl
        },
        {
          title: 'Trạng thái',
          width: 150,
          field: 'available'
        },
        {
          title: 'Giới Tính',
          width: 120,
          field: 'sex',
          pipe: 'sex'
        },
        {
          title: 'Điện Thoại',
          width: 150,
          field: 'dienthoai'
        },
        {
          title: 'Email',
          width: 200,
          field: 'email'
        },
        {
          title: 'Đăng nhập lần cuối',
          width: 200,
          field: 'lastLoginTime',
          pipe: 'date:yyyy-MM-dd HH:mm'
        },
        {
          title: 'Ngày khởi tạo',
          width: 150,
          field: 'createdAt',
          pipe: 'date:yyyy-MM-dd HH:mm'
        },
        {
          title: 'Zalo',
          width: 150,
          field: 'zalo'
        }
      ],
      total: 0,
      loading: true,
      pageSize: 10,
      pageIndex: 1
    };
  }

}
