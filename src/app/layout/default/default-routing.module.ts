import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JudgAuthGuard } from '@core/services/common/guard/judgAuth.guard';
import { JudgLoginGuard } from '@core/services/common/guard/judgLogin.guard';

import { DefaultComponent } from './default.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    data: { shouldDetach: 'no' },
    canActivateChild: [JudgLoginGuard, JudgAuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../../pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'page-demo',
        loadChildren: () => import('../../pages/page-demo/page-demo.module').then(m => m.PageDemoModule)
      },
      {
        path: 'feat',
        loadChildren: () => import('../../pages/feat/feat.module').then(m => m.FeatModule)
      },
      {
        path: 'comp',
        loadChildren: () => import('../../pages/comp/comp.module').then(m => m.CompModule)
      },
      {
        path: 'level',
        loadChildren: () => import('../../pages/level/level.module').then(m => m.LevelModule)
      },
      {
        path: 'about',
        loadChildren: () => import('../../pages/about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'system',
        loadChildren: () => import('../../pages/system/system.module').then(m => m.SystemModule)
      },
      {
        path: 'chuyen',
        loadChildren: () => import('../../pages/chuyen/chuyen.module').then(m => m.ChuyenModule)
      },
      {
        path: 'khachhang',
        loadChildren: () => import('../../pages/khachhang/khachhang.module').then(m => m.KhachhangModule)
      },
      {
        path: 'trongkho',
        loadChildren: () => import('../../pages/trongkho/trongkho.module').then(m => m.TrongkhoModule)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule {}
