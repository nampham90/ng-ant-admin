import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Demo3Component } from './demo3.component';

const routes: Routes = [
  {path: '', component: Demo3Component, data: {key: 'demo3'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Demo3RoutingModule { }
