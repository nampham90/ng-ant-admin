import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Sprp00702Component } from './sprp00702.component';

const routes: Routes = [
  {
    path: '',
    component: Sprp00702Component,
    data: { title: 'Thông kê chung', key: 'sprp00702' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Sprp00702RoutingModule { }
