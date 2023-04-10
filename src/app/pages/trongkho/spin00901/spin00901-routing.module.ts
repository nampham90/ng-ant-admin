import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Spin00901Component } from './spin00901.component';

const routes: Routes = [
  {
    path:"",component: Spin00901Component, data: { title: 'Quản lý kho', key: 'spin00901' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Spin00901RoutingModule { }
