import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Spin00801RoutingModule } from './spin00801-routing.module';
import { Spin00801Component } from './spin00801.component';
import { SubwindowvideoyoutubeModule } from '@app/widget/modal/subwindowvideoyoutube/subwindowvideoyoutube.module';
import { SharedModule } from '@app/shared/shared.module';
import { SubcommonsoidModule } from '@app/widget/modal/common/subcommonsoid/subcommonsoid.module';
import { ClipboardModule } from '@angular/cdk/clipboard';


@NgModule({
  declarations: [
    Spin00801Component
  ],
  imports: [
    SharedModule,
    Spin00801RoutingModule,
    SubwindowvideoyoutubeModule,
    SubcommonsoidModule,
    ClipboardModule
  ]
})
export class Spin00801Module { }
