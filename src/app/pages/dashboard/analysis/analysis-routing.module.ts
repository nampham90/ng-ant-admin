/* eslint-disable prettier/prettier */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalysisComponent } from './analysis.component';

const routes: Routes = [{ path: '', component: AnalysisComponent, data: { title: 'Trang phân tích', key: 'analysis' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalysisRoutingModule {}
