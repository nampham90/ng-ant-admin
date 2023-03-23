import { NgModule } from '@angular/core';

import { Spch00101RoutingModule } from './spch00101-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { Spch00101Component } from './spch00101.component';
import { SubwindowxeModule } from '@app/widget/modal/subwindowxe/subwindowxe.module';
import { NzHighlightModule } from 'ng-zorro-antd/core/highlight';
import { SubwindowtaixeModule } from '../../../widget/modal/subwindowtaixe/subwindowtaixe.module';
import { SubwindowchuyenModule } from '@app/widget/modal/subwindowchuyen/subwindowchuyen.module';
import { SubwindowchiphiModule } from '@app/widget/modal/subwindowchiphi/subwindowchiphi.module';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { SubwindowvideoyoutubeModule } from '@app/widget/modal/subwindowvideoyoutube/subwindowvideoyoutube.module';


@NgModule({
  declarations: [
    Spch00101Component
  ],
  imports: [
    Spch00101RoutingModule,
    SharedModule,
    SubwindowxeModule,
    SubwindowtaixeModule,
    SubwindowchuyenModule,
    SubwindowchiphiModule,
    NzHighlightModule,
    ClipboardModule,
    SubwindowvideoyoutubeModule
  ],
  
})
export class Spch00101Module { }
