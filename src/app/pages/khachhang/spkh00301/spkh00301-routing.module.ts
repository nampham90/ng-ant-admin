import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Spkh00301Component } from './spkh00301.component';

const routes: Routes = [
  {path: '', component: Spkh00301Component,data: { title: 'Tìm kiếm số ODC', key: 'spkh00301' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Spkh00301RoutingModule { }
