import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Spch00351RoutingModule } from './spch00351-routing.module';
import { Spch00351Component } from './spch00351.component';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    Spch00351Component
  ],
  imports: [
    SharedModule,
    Spch00351RoutingModule
  ]
})
export class Spch00351Module { }
