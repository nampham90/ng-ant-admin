import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Spch00253RoutingModule } from './spch00253-routing.module';
import { Spch00253Component } from './spch00253.component';
import { SharedModule } from '@app/shared/shared.module';
import { SubwindowsearchkhachhangModule } from '@app/widget/modal/subwindowsearchkhachhang/subwindowsearchkhachhang.module';
import { SubwindowsearchnguonxeModule } from '@app/widget/modal/subwindowsearchnguonxe/subwindowsearchnguonxe.module';
import { ClipboardModule } from '@angular/cdk/clipboard'
import { SubwindowvideoyoutubeModule } from '@app/widget/modal/subwindowvideoyoutube/subwindowvideoyoutube.module';

@NgModule({
  declarations: [
    Spch00253Component
  ],
  imports: [
    SharedModule,
    Spch00253RoutingModule,
    SubwindowsearchkhachhangModule,
    SubwindowsearchnguonxeModule,
    ClipboardModule,
    SubwindowvideoyoutubeModule
  ]
})
export class Spch00253Module { }
