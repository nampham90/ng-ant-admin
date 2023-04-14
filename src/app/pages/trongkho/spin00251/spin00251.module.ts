import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Spin00251RoutingModule } from './spin00251-routing.module';
import { Spin00251Component } from './spin00251.component';
import { SharedModule } from '@app/shared/shared.module';
import { SubwindowvideoyoutubeModule } from '@app/widget/modal/subwindowvideoyoutube/subwindowvideoyoutube.module';
import { Spin00251subModule } from '@app/widget/modal/trongkho/spin00251sub/spin00251sub.module';
import { Spin00251subkhachhangModule } from '@app/widget/modal/trongkho/spin00251subkhachhang/spin00251subkhachhang.module';


@NgModule({
  declarations: [
    Spin00251Component
  ],
  imports: [
    SharedModule,
    Spin00251RoutingModule,
    SubwindowvideoyoutubeModule,
    Spin00251subModule,
    Spin00251subkhachhangModule
  ]
})
export class Spin00251Module { }
