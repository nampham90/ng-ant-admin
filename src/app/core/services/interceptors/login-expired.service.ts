
import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, finalize, share, switchMap } from 'rxjs/operators';

import { TokenKey, loginTimeOutCode, tokenErrorCode } from '@config/constant';
import { LoginInOutService } from '@core/services/common/login-in-out.service';
import { ModalBtnStatus } from '@widget/base-modal';
import { LoginModalService } from '@widget/biz-widget/login/login-modal.service';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';

import { WindowService } from '../common/window.service';

@Injectable()
export class LoginExpiredService implements HttpInterceptor {
  private refresher: Observable<NzSafeAny> | null = null;

  constructor(
    private loginModalService: LoginModalService,
    private router: Router,
    private loginInOutService: LoginInOutService,
    private zone: NgZone,
    private message: NzMessageService,
    private windowServe: WindowService,
    private http: HttpClient
  ) {}

  intercept(req: HttpRequest<string>, next: HttpHandler): Observable<HttpEvent<NzSafeAny>> {
    const newReq = req.clone();
    return next.handle(newReq).pipe(
      filter(e => e.type !== 0),
      this.loginExpiredFn(newReq, next)
    );
  }

  private sendRequest(request: HttpRequest<NzSafeAny>, next: HttpHandler): Observable<NzSafeAny> | null {
    return this.refresher!.pipe(
      switchMap(() => {
        const token = this.windowServe.getSessionStorage(TokenKey);
        let httpConfig = {};
        if (!!token) {
          httpConfig = { headers: request.headers.set(TokenKey, token) };
        }
        this.refresher = null;
        const copyReq = request.clone(httpConfig);
        return next.handle(copyReq).pipe(finalize(() => (this.refresher = null)));
      }),
      finalize(() => (this.refresher = null))
    );
  }

  private loginOut(): void {
    this.loginInOutService.loginOut();
    this.refresher = null;
    this.router.navigateByUrl('/login/login-form');
  }

  // Chặn phiên đăng nhập hết hạn
  private loginExpiredFn(req: HttpRequest<string>, next: HttpHandler): NzSafeAny {
    return switchMap((event: HttpResponse<NzSafeAny>): NzSafeAny => {
      if (event.type !== HttpEventType.Response || event.body.code !== loginTimeOutCode) {
        return of(event);
      }
      if (event.body.code === tokenErrorCode) {
        this.loginOut();
        return;
      }

      if (this.refresher) {
        return this.sendRequest(req, next);
      }

      this.refresher = new Observable(observer => {
        // setTimeout để giải quyết việc khi làm mới trang, do giao diện zorro chưa được tải, hộp thoại đăng nhập sẽ hiện lên rồi biến mất
        setTimeout(() => {
          this.loginModalService.show({ nzTitle: 'Thông tin đăng nhập đã hết hạn, vui lòng đăng nhập lại' }).subscribe(({ modalValue, status }) => {
            if (status === ModalBtnStatus.Cancel) {
              // Hành động này nhằm mục đích khi token hết hạn trong trạng thái đăng nhập, làm mới trang, nhấp vào hủy trong cửa sổ đăng nhập, cần hoàn thành giao diện menu trong startUp, 
              // Nếu không, không thể truy cập vào ứng dụng angular, không chuyển đổi tuyến đường
              observer.next(
                new HttpResponse({
                  body: {
                    code: 3013,
                    msg: 'Vui lòng đăng nhập lại sau khi hủy',
                    data: null
                  }
                })
              );
              this.loginOut();
              return;
            }
            const token = modalValue;
            this.loginInOutService.loginIn(token).then();
            this.http.request(req).subscribe(
              (data: NzSafeAny) => {
                this.refresher = null;
                observer.next(data);
              },
              error => {
               // Nếu sử dụng tài khoản admin để đăng nhập nhưng cửa sổ hết hạn xuất hiện, nhưng đăng nhập bằng tài khoản normal, không có quyền truy cập vào mô-đun đích, sẽ trở về trang đăng nhập 
               // Ở đây, phía máy chủ kiểm tra token mới không có quyền, yêu cầu lỗi 403 trả về trang đăng nhập"
                //this.message.error('Bạn không có quyền đăng nhập vào mô-đun này');
                this.loginOut();
              }
            );
          });
        }, 100);
      }).pipe(
        share(),
        finalize(() => (this.refresher = null))
      );
      return this.refresher;
    });
  }
}
