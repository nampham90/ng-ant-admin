import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileRoutingModule } from './mobile-routing.module';
import { MobileComponent } from './mobile.component';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';

@NgModule({
  declarations: [
    MobileComponent,

  ],
  imports: [
    
    NgZorroAntdMobileModule,
    CommonModule,
    MobileRoutingModule
  ]
})
export class MobileModule { }
