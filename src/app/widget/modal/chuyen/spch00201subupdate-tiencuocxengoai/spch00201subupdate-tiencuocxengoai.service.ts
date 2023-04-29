import { Injectable } from '@angular/core';
import { ModalWrapService } from '@app/widget/base-modal';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ModalOptions } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { Spch00201subupdateTiencuocxengoaiComponent } from './spch00201subupdate-tiencuocxengoai.component';
@Injectable({
  providedIn: 'root'
})
export class Spch00201subupdateTiencuocxengoaiService {

  constructor(private modalWrapService: ModalWrapService) { }
  protected getContentComponent(): NzSafeAny {
    return Spch00201subupdateTiencuocxengoaiComponent;
  }

  public show(modalOptions: ModalOptions = {}, params?: object): Observable<NzSafeAny> {
    return this.modalWrapService.show(this.getContentComponent(), modalOptions, params);
  }
}
