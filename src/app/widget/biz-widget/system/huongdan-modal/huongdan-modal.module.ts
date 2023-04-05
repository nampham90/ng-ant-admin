import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { HuongdanModalComponent } from './huongdan-modal.component';


@NgModule({
  declarations: [HuongdanModalComponent],
  imports: [
    SharedModule,
  ]
})
export class HuongdanModalModule { }
