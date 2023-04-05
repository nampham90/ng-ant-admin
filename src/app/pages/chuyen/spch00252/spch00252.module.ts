import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Spch00252RoutingModule } from './spch00252-routing.module';
import { Spch00252Component } from './spch00252.component';
import { SharedModule } from '@app/shared/shared.module';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { SubwindowvideoyoutubeModule } from '@app/widget/modal/subwindowvideoyoutube/subwindowvideoyoutube.module';


@NgModule({
  declarations: [
    Spch00252Component
  ],
  imports: [
    SharedModule,
    Spch00252RoutingModule,
    ClipboardModule,
    SubwindowvideoyoutubeModule
  ]
})
export class Spch00252Module { }
