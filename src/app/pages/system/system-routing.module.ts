import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'menu', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule) },
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path: 'dept', loadChildren: () => import('./dept/dept.module').then(m => m.DeptModule) },
  { path: 'role-manager', loadChildren: () => import('./role-manager/role-manage.module').then(m => m.RoleManageModule) },
  { path: 'datasc', loadChildren: () => import('./datasc/datasc.module').then(m => m.DatascModule)},
  { path: 'quanlyxe', loadChildren: () => import('./xe/xe.module').then(m => m.XeModule)},
  { path: 'quanlynguonxe', loadChildren: () => import('./nguonxe/nguonxe.module').then(m => m.NguonxeModule)},
  { path: 'huongdan', loadChildren: () => import('./huongdan/huongdan.module').then(m => m.HuongdanModule)},
  { path: 'spcm01101', loadChildren: () => import('./spcm01101/spcm01101.module').then(m => m.Spcm01101Module)},
  { path: 'spcm01102', loadChildren: () => import('./spcm01102/spcm01102.module').then(m => m.Spcm01102Module)},
  { path: 'spcm01103', loadChildren: () => import('./spcm01103/spcm01103.module').then(m => m.Spcm01103Module)},
  { path: '', redirectTo: 'dept', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}
