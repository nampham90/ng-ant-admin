import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileComponent } from './mobile.component';

const routes: Routes = [
   {
    path: '', 
    component: MobileComponent,
    data: {key: 'mobile', shouldDetach: 'no' },
    children: [
      {
        path: 'demo1', 
        loadChildren: () => import('../../pages/mobile/demo1/demo1.module').then(m => m.Demo1Module)
      },
      {
        path: 'demo2',
        loadChildren: () => import('../../pages/mobile/demo2/demo2.module').then(m => m.Demo2Module)
      },
      {
        path: 'demo3',
        loadChildren: () => import('../../pages/mobile/demo3/demo3.module').then(m => m.Demo3Module)
      },
      { path: '', redirectTo: 'demo1', pathMatch: 'full' }
   ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRoutingModule { }
