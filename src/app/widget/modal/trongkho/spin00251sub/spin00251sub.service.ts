import { Injectable } from '@angular/core';
import { ModalWrapService } from '@app/widget/base-modal';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ModalOptions } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { Spin00251subComponent } from './spin00251sub.component';
@Injectable({
  providedIn: 'root'
})
export class Spin00251subService {
  constructor(
    private modalWrapService: ModalWrapService
  ) { }
  protected getContentComponent(): NzSafeAny {
    return Spin00251subComponent;
  }
  public show(modalOptions: ModalOptions = {}, params?: object): Observable<NzSafeAny> {
    return this.modalWrapService.show(this.getContentComponent(), modalOptions, params);
  }
}
