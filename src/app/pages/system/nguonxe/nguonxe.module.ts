import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NguonxeRoutingModule } from './nguonxe-routing.module';
import { NguonxeComponent } from './nguonxe.component';
import { SharedModule } from '@app/shared/shared.module';
import { NguonxeModalModule } from '@app/widget/biz-widget/system/nguonxe-modal/nguonxe-modal.module';
import { Tmt050modalModule } from '@app/widget/biz-widget/system/tmt050modal/tmt050modal.module';
import { Spin00901subModule } from '@app/widget/modal/trongkho/spin00901sub/spin00901sub.module';


@NgModule({
  declarations: [
    NguonxeComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    NguonxeRoutingModule,
    NguonxeModalModule,
    Tmt050modalModule,
    Spin00901subModule
  ]
})
export class NguonxeModule { }
