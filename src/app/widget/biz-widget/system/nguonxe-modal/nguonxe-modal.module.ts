import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NguonxeModalComponent } from './nguonxe-modal.component';
import { SharedModule } from '@app/shared/shared.module';



@NgModule({
  declarations: [
    NguonxeModalComponent
  ],
  imports: [
    SharedModule
  ]
})
export class NguonxeModalModule { }
