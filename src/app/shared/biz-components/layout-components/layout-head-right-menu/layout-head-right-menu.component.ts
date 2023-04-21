import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifiService } from '@app/core/services/common/notifi.service';
import { WebserviceService } from '@app/core/services/common/webservice.service';

import { LoginInOutService } from '@core/services/common/login-in-out.service';
import { WindowService } from '@core/services/common/window.service';
import { AccountService, UserPsd } from '@services/system/account.service';
import { SpinService } from '@store/common-store/spin.service';
import { UserInfoService } from '@store/common-store/userInfo.service';
import { ModalBtnStatus } from '@widget/base-modal';
import { ChangePasswordService } from '@widget/biz-widget/change-password/change-password.service';
import { LockWidgetService } from '@widget/common-widget/lock-widget/lock-widget.service';
import { SearchRouteService } from '@widget/common-widget/search-route/search-route.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ModalOptions, NzModalService } from 'ng-zorro-antd/modal';
import * as Const from "src/app/common/const";
@Component({
  selector: 'app-layout-head-right-menu',
  templateUrl: './layout-head-right-menu.component.html',
  styleUrls: ['./layout-head-right-menu.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutHeadRightMenuComponent implements OnInit {
  user!: UserPsd;
  userDetail: any;
  totalNotifi = 0;

  constructor(
    private router: Router,
    private changePasswordModalService: ChangePasswordService,
    private spinService: SpinService,
    private loginOutService: LoginInOutService,
    private lockWidgetService: LockWidgetService,
    private windowServe: WindowService,
    private activatedRoute: ActivatedRoute,
    private searchRouteService: SearchRouteService,
    public message: NzMessageService,
    private userInfoService: UserInfoService,
    private accountService: AccountService,
    private notifiService: NotifiService,
    private webService: WebserviceService,
    private modalSrv: NzModalService,
  ) {}

  // 锁定屏幕
  lockScreen(): void {
    this.lockWidgetService
      .show({
        nzTitle: 'Màn hình khóa',
        nzStyle: { top: '25px' },
        nzWidth: '520px',
        nzFooter: null,
        nzMaskClosable: true
      },{username: this.userDetail.username})
      .subscribe();
  }

  // 修改密码
  changePassWorld(): void {
    this.changePasswordModalService.show({ nzTitle: 'Đổi mật khẩu' }).subscribe(({ modalValue, status }) => {
      if (status === ModalBtnStatus.Cancel) {
        return;
      }
      this.userInfoService.getUserInfo().subscribe(res => {
        this.user = {
          id: res.userId,
          oldPassword: modalValue.oldPassword,
          newPassword: modalValue.newPassword
        };
      });
      this.accountService.editAccountPsd(this.user).subscribe((res) => {
        if(res['msgId'] == "") {
          this.loginOutService.loginOut().then();
          this.message.success('Sửa đổi thành công, vui lòng đăng nhập lại');
        } else {
          this.modalSrv.info({nzTitle: res['msgId'],nzContent: res['msgError']});
        }
       
      });
    });
  }

  showSearchModal(): void {
    const modalOptions: ModalOptions = {
      nzClosable: false,
      nzMaskClosable: true,
      nzStyle: { top: '48px' },
      nzFooter: null,
      nzBodyStyle: { padding: '0' }
    };
    this.searchRouteService.show(modalOptions);
  }

  goLogin(): void {
    this.loginOutService.loginOut().then();
  }

  clean(): void {
    this.windowServe.clearStorage();
    this.windowServe.clearSessionStorage();
    this.loginOutService.loginOut().then();
    this.message.success('Đã xóa thành công, vui lòng đăng nhập lại');
  }

  showMessage(): void {
    this.message.info('Chưa Thiết Lập');
  }

  goPage(path: string): void {
    this.router.navigateByUrl(`/default/page-demo/personal/${path}`);
  }

  getListSystem() {
    this.webService.PostCallWs(Const.NhatkyhethongfindType,{loaithongbao:Const.System},(response)=> {
       this.notifiService.lstsystem = response;
       this.notifiService.status = false;
       this.totalNotifi = this.notifiService.totalNotifi();
    })
  }

  getListNotifi() {
    this.webService.PostCallWs(Const.NhatkyhethongfindType,{loaithongbao:Const.Notifi},(response)=> {
      this.notifiService.lstnotifi = response;
      this.notifiService.status = false;
      this.totalNotifi = this.notifiService.totalNotifi();
   })
  }

  getListVison() {
    this.webService.PostCallWs(Const.NhatkyhethongfindType,{loaithongbao:Const.Vison},(response)=> {
      this.notifiService.lstvison = response;
      this.notifiService.status = false;
      this.totalNotifi = this.notifiService.totalNotifi();
   })
  }

  ngOnInit(): void {
    this.getListSystem();
    this.getListNotifi();
    this.getListVison();
    this.userInfoService.getUserInfo().subscribe(res => {
      this.userDetail = {
        userId: res.userId,
        username: res.username,
        email: res.email
      };
    });
  }
}
