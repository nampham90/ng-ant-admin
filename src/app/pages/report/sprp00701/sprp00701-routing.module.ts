import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Sprp00701Component } from './sprp00701.component';

const routes: Routes = [
  {
    path: '',
    component: Sprp00701Component,
    data: { title: 'Thông kê chung', key: 'sprp00701' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Sprp00701RoutingModule { }
