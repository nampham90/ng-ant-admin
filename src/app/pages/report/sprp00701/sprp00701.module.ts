import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Sprp00701RoutingModule } from './sprp00701-routing.module';
import { Sprp00701Component } from './sprp00701.component';
import { SharedModule } from '@app/shared/shared.module';
import { ClipboardModule } from '@angular/cdk/clipboard';


@NgModule({
  declarations: [
    Sprp00701Component
  ],
  imports: [
    SharedModule,
    Sprp00701RoutingModule,
    ClipboardModule
  ]
})
export class Sprp00701Module { }
