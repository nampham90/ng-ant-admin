import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ModalOptions } from 'ng-zorro-antd/modal';
import { ModalWrapService } from '@widget/base-modal';
import { Spcm01103ModalComponent } from './spcm01103-modal.component';
@Injectable({
  providedIn: 'root'
})
export class Spcm01103ModalService {

  constructor(private modalWrapService: ModalWrapService) {}
  protected getContentComponent(): NzSafeAny {
    return Spcm01103ModalComponent;
  }

  public show(modalOptions: ModalOptions = {}, params?: object): Observable<NzSafeAny> {
    return this.modalWrapService.show(this.getContentComponent(), modalOptions, params);
  }
}
