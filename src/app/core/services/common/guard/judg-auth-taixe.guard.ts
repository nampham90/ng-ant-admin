import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { WindowService } from '../window.service';
import { fnGetUUID } from '@utils/tools';
import { LoginInOutService } from '../login-in-out.service';
import { UserInfoService } from '../../store/common-store/userInfo.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TokenKey, TokenPre } from '@config/constant';

@Injectable({
  providedIn: 'root'
})
export class JudgAuthTaixeGuard implements CanActivateChild {

  authCodeArray: string[] = [];

  constructor(
    private windowSrc: WindowService,
    private loginOutService: LoginInOutService,
    private router: Router,
    private userInfoService: UserInfoService,
    private message: NzMessageService
  ){
    
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      window.addEventListener('beforeunload', this.handleBeforeUnload);
      this.userInfoService.getUserInfo().subscribe(res => (this.authCodeArray = res.authCode));
      return this.getResult(childRoute.data['authCode'], this.authCodeArray);
  }

  private handleBeforeUnload = () => {
    // Xử lý sự kiện trước khi trang được tải lại
    this.windowSrc.removeSessionStorage(TokenKey);
  }

  getResult(code: string, authCodeArray: string[]): boolean | UrlTree {
    if ((authCodeArray.length == 3 && this.authCodeArray[0] == "1")) {
      return true;
    } else {
      this.message.error('Bạn không có quyền đăng nhập vào mô-đun này.');
      this.loginOutService.loginOut();
      return this.router.parseUrl('/login');
    }
  }
  
}
