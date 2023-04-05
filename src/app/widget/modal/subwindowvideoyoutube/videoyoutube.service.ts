import { Injectable } from '@angular/core';
import { SubwindowvideoyoutubeComponent } from './subwindowvideoyoutube.component';
import { ModalWrapService } from '@app/widget/base-modal';
import { ModalOptions } from 'ng-zorro-antd/modal';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoyoutubeService {
  constructor(private modalWrapService: ModalWrapService) {}
  protected getContentComponent(): NzSafeAny {
    return SubwindowvideoyoutubeComponent;
  }

  public show(modalOptions: ModalOptions = {}, params?: object): Observable<NzSafeAny> {
    return this.modalWrapService.show(this.getContentComponent(), modalOptions, params);
  }
}
