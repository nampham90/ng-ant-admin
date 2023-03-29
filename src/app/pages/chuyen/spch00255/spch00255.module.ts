import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Spch00255RoutingModule } from './spch00255-routing.module';
import { Spch00255Component } from './spch00255.component';
import { SharedModule } from '@app/shared/shared.module';
import { SubwindowsearchnguonxeModule } from '@app/widget/modal/subwindowsearchnguonxe/subwindowsearchnguonxe.module';
import { SubwindowvideoyoutubeModule } from '@app/widget/modal/subwindowvideoyoutube/subwindowvideoyoutube.module';


@NgModule({
  declarations: [
    Spch00255Component
  ],
  imports: [
    SharedModule,
    Spch00255RoutingModule,
    SubwindowsearchnguonxeModule,
    SubwindowvideoyoutubeModule
  ]
})
export class Spch00255Module { }
