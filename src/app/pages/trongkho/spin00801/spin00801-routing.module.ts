import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Spin00801Component } from './spin00801.component';

const routes: Routes = [
  {
    path:"",component: Spin00801Component, data: { title: 'Hủy nhập hàng', key: 'spin00801' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Spin00801RoutingModule { }
