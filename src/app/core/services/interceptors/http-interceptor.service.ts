
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';

import { TokenKey } from '@config/constant';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';

import { WindowService } from '../common/window.service';
import * as Const from '@app/common/const';
import { SocketService } from '../common/socket.service';
import { IpService } from './ip-service.service';
interface CustomHttpConfig {
  headers?: HttpHeaders;
}

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private windowServe: WindowService, 
    public message: NzMessageService,
    private socketService:SocketService,
    private ipService : IpService
    ) {}

  intercept(req: HttpRequest<NzSafeAny>, next: HttpHandler): Observable<HttpEvent<NzSafeAny>> {
    const token = this.windowServe.getSessionStorage(TokenKey);
    let httpConfig: CustomHttpConfig = {};
    if (!!token) {
      httpConfig = { headers: req.headers.set(TokenKey, token) };
    }
    const copyReq = req.clone(httpConfig);
    if(copyReq.url == Const.tinhthanhApi) {
      return next.handle(req);
    } 
    return next.handle(copyReq).pipe(
      filter(e => e.type !== 0),
      catchError(error => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const status = error.status;
    let errMsg = '';
    if (status === 0) {
      this.socketService.emit("client-get-ip","msg");
      this.socketService.on('server-send-ip', (ip: string) => {
          //this.message.info(ip);
         // this.ipService.ip = ip;
      })
      errMsg = 'Đã xảy ra lỗi mạng không xác định, vui lòng kiểm tra mạng của bạn.';
      this.message.info('Đã xảy ra lỗi mạng không xác định, vui lòng kiểm tra mạng của bạn.');
    }
    if (status >= 300 && status < 400) {
      errMsg = `Yêu cầu đã được chuyển hướng bởi máy chủ với mã trạng thái ${status}`;
      this.message.info(`Yêu cầu đã được chuyển hướng bởi máy chủ với mã trạng thái ${status}`);
    }
    if (status >= 400 && status < 500) {
      errMsg = `Máy khách bị lỗi, có thể dữ liệu gửi sai, mã trạng thái ${status}`;
      this.message.info(`Máy khách bị lỗi, có thể dữ liệu gửi sai, mã trạng thái ${status}`);
      
    }
    if (status >= 500) {
      errMsg = `Đã xảy ra lỗi máy chủ với mã trạng thái ${status}`;
      this.message.info(`Đã xảy ra lỗi máy chủ với mã trạng thái ${status}`);
    }
    return throwError({
      code: status,
      message: errMsg
    });
  }
}
