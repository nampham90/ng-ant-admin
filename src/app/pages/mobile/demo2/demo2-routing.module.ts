import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Demo2Component } from './demo2.component';

const routes: Routes = [
  { path: '', component: Demo2Component, data: {key: 'demo2'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Demo2RoutingModule { }
