import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Spch00254RoutingModule } from './spch00254-routing.module';
import { Spch00254Component } from './spch00254.component';
import { SharedModule } from '@app/shared/shared.module';
import { SubwindowsearchnguonxeModule } from '@app/widget/modal/subwindowsearchnguonxe/subwindowsearchnguonxe.module';
import { SubwindowvideoyoutubeModule } from '@app/widget/modal/subwindowvideoyoutube/subwindowvideoyoutube.module';


@NgModule({
  declarations: [
    Spch00254Component
  ],
  imports: [
    SharedModule,
    Spch00254RoutingModule,
    SubwindowsearchnguonxeModule,
    SubwindowvideoyoutubeModule
  ]
})
export class Spch00254Module { }