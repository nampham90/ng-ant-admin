import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileRoutingModule } from './mobile-routing.module';
import { MobileComponent } from './mobile.component';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { RefreshDetectorComponent } from './ref.component';

@NgModule({
  declarations: [
    MobileComponent,
    RefreshDetectorComponent
  ],
  imports: [
    
    NgZorroAntdMobileModule,
    CommonModule,
    MobileRoutingModule
  ]
})
export class MobileModule { }
