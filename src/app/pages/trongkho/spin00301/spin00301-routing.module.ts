import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Spin00301Component } from './spin00301.component';

const routes: Routes = [
  {
    path:"",component: Spin00301Component, data: { title: 'Tìm kiếm', key: 'spin00301' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Spin00301RoutingModule { }
