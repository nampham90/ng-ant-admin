import { Injectable } from '@angular/core';
import { ModalWrapService } from '@app/widget/base-modal';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ModalOptions } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { Tmt050modalComponent } from './tmt050modal.component';
@Injectable({
  providedIn: 'root'
})
export class Tmt050modalService {

  constructor(
    private modalWrapService: ModalWrapService
  ) { }
  protected getContentComponent(): NzSafeAny {
    return Tmt050modalComponent;
  }
  public show(modalOptions: ModalOptions = {}, params?: object): Observable<NzSafeAny> {
    return this.modalWrapService.show(this.getContentComponent(), modalOptions, params);
  }
}
