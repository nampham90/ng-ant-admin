import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Spin00251subkhachhangComponent } from './spin00251subkhachhang.component';
import { SharedModule } from '@app/shared/shared.module';
import { SubwindowsmartkhachhangModule } from '../../subwindowsmartkhachhang/subwindowsmartkhachhang.module';



@NgModule({
  declarations: [
    Spin00251subkhachhangComponent
  ],
  imports: [
    SharedModule,
    SubwindowsmartkhachhangModule
  ]
})
export class Spin00251subkhachhangModule { }
