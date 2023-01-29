import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileComponent } from './mobile.component';
import { Mbtx00101Component } from './mbtx00101/mbtx00101.component';
import { Mbtx00201Component } from './mbtx00201/mbtx00201.component';
import { Mbtx00301Component } from './mbtx00301/mbtx00301.component';
import { JudgLoginGuard } from '@app/core/services/common/guard/judgLogin.guard';
import { JudgAuthTaixeGuard } from '@app/core/services/common/guard/judg-auth-taixe.guard';

const routes: Routes = [
  { 
    path: '',
    component: MobileComponent,
    data: { shouldDetach: 'no' },
    canActivateChild: [JudgLoginGuard,JudgAuthTaixeGuard],
    children: [
      { path: 'mbtx00101' , component: Mbtx00101Component, data: {key: 'mbtx00101'}},
      { path: 'mbtx00201' , component: Mbtx00201Component, data: {key: 'mbtx00201'}},
      { path: 'mbtx00301' , component: Mbtx00301Component, data: {key: 'mbtx00301'}},
      { path: '', redirectTo: 'mbtx00101', pathMatch: 'full' }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRoutingModule { }
