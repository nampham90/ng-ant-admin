import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Spin00601Component } from './spin00601.component';

const routes: Routes = [
  {
    path:"",component: Spin00601Component, data: { title: 'Tồn kho', key: 'spin00601' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Spin00601RoutingModule { }
