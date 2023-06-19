import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'sprp00701', loadChildren: ()=>import('../report/sprp00701/sprp00701.module').then(m=>m.Sprp00701Module)},
  { path: 'sprp00702', loadChildren: ()=>import('../report/sprp00702/sprp00702.module').then(m=>m.Sprp00702Module)},
  { path: '', redirectTo: 'sprp00701', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
