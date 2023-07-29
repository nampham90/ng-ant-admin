import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Spkh00201RoutingModule } from './spkh00201-routing.module';
import { Spkh00201Component } from './spkh00201.component';
import { SharedModule } from '@app/shared/shared.module';
import { SubwindowvideoyoutubeModule } from '@app/widget/modal/subwindowvideoyoutube/subwindowvideoyoutube.module';
import { Spch00201subupdateTiencuocxenhaModule } from '@app/widget/modal/chuyen/spch00201subupdate-tiencuocxenha/spch00201subupdate-tiencuocxenha.module';
import { Spkh00201subthanhtoanModule } from '@app/widget/modal/khachhang/spkh00201subthanhtoan/spkh00201subthanhtoan.module';


@NgModule({
  declarations: [
    Spkh00201Component
  ],
  imports: [
    CommonModule,
    Spkh00201RoutingModule,
    SharedModule,
    SubwindowvideoyoutubeModule,
    Spch00201subupdateTiencuocxenhaModule,
    Spkh00201subthanhtoanModule
  ]
})
export class Spkh00201Module { }
