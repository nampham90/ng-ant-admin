import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HuongdanRoutingModule } from './huongdan-routing.module';
import { HuongdanComponent } from './huongdan.component';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    HuongdanComponent
  ],
  imports: [
    SharedModule,
    HuongdanRoutingModule
  ]
})
export class HuongdanModule { }
