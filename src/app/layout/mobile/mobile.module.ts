import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileRoutingModule } from './mobile-routing.module';
import { MobileComponent } from './mobile.component';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { Mbtx00101Component } from './mbtx00101/mbtx00101.component';
import { Mbtx00201Component } from './mbtx00201/mbtx00201.component';
import { RefreshDetectorComponent } from './refresh.component';



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
    MobileRoutingModule
  ]
})
export class MobileModule { }
