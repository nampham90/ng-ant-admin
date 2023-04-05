import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileRoutingModule } from './mobile-routing.module';
import { MobileComponent } from './mobile.component';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { Mbtx00101Component } from './mbtx00101/mbtx00101.component';
import { Mbtx00201Component } from './mbtx00201/mbtx00201.component';
import { RefreshDetectorComponent } from './refresh.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { SharedModule } from '@app/shared/shared.module';
import { SubwindowchiphiModule } from '@app/widget/modal/subwindowchiphi/subwindowchiphi.module';
import { SubwindowproductModule } from '@app/widget/modal/subwindowproduct/subwindowproduct.module';



@NgModule({
  declarations: [
    MobileComponent,
    Mbtx00101Component,
    Mbtx00201Component,
    Mbtx00201Component,
    RefreshDetectorComponent
  ],
  imports: [
    NgZorroAntdMobileModule,
    CommonModule,
    MobileRoutingModule,
    ClipboardModule,
    SharedModule,
    SubwindowproductModule,
    SubwindowchiphiModule
  ]
})
export class MobileModule { }
