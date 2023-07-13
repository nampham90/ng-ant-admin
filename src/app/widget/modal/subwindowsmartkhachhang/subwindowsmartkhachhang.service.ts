import { Injectable } from '@angular/core';
import { ModalWrapService } from '@app/widget/base-modal';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ModalOptions } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { SubwindowsmartkhachhangComponent } from './subwindowsmartkhachhang.component';

@Injectable({
  providedIn: 'root'
})
export class SubwindowSmartKhachhangService {

  constructor(private modalWrapService: ModalWrapService) { }
  protected getContentComponent(): NzSafeAny {
    return SubwindowsmartkhachhangComponent;
  }

  public show(modalOptions: ModalOptions = {}, params?: object): Observable<NzSafeAny> {
    return this.modalWrapService.show(this.getContentComponent(), modalOptions, params);
  }
}