import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Spkh00301RoutingModule } from './spkh00301-routing.module';
import { Spkh00301Component } from './spkh00301.component';
import { SharedModule } from '@app/shared/shared.module';
import { SubwindowvideoyoutubeModule } from '@app/widget/modal/subwindowvideoyoutube/subwindowvideoyoutube.module';


@NgModule({
  declarations: [
    Spkh00301Component
  ],
  imports: [
    SharedModule,
    Spkh00301RoutingModule,
    SubwindowvideoyoutubeModule
  ]
})
export class Spkh00301Module { }
