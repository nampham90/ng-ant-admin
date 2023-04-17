import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Spin00601RoutingModule } from './spin00601-routing.module';
import { Spin00601Component } from './spin00601.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { SubcommonsoidModule } from '@app/widget/modal/common/subcommonsoid/subcommonsoid.module';
import { SubwindowvideoyoutubeModule } from '@app/widget/modal/subwindowvideoyoutube/subwindowvideoyoutube.module';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    Spin00601Component
  ],
  imports: [
    SharedModule,
    Spin00601RoutingModule,
    SubwindowvideoyoutubeModule,
    SubcommonsoidModule,
    ClipboardModule
  ]
})
export class Spin00601Module { }
