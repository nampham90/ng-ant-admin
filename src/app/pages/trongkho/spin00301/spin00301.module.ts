import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Spin00301RoutingModule } from './spin00301-routing.module';
import { Spin00301Component } from './spin00301.component';
import { SharedModule } from '@app/shared/shared.module';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { SubcommonsoidModule } from '@app/widget/modal/common/subcommonsoid/subcommonsoid.module';


@NgModule({
  declarations: [
    Spin00301Component
  ],
  imports: [
    SharedModule,
    Spin00301RoutingModule,
    SubcommonsoidModule,
    ClipboardModule
  ]
})
export class Spin00301Module { }
