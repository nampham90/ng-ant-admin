import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Spin00251Component } from './spin00251.component';

const routes: Routes = [
  {
    path:"",component: Spin00251Component, data: { title: 'Nhập hàng', key: 'spin00251' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Spin00251RoutingModule { }
