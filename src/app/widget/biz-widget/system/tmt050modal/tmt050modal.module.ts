import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tmt050modalComponent } from './tmt050modal.component';
import { SharedModule } from '@app/shared/shared.module';



@NgModule({
  declarations: [
    Tmt050modalComponent
  ],
  imports: [
    SharedModule
  ]
})
export class Tmt050modalModule { }
