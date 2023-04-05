import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileComponent } from './mobile.component';
import { JudgLoginGuard } from '@app/core/services/common/guard/judgLogin.guard';
import { JudgAuthTaixeGuard } from '@app/core/services/common/guard/judg-auth-taixe.guard';

const routes: Routes = [
  { 
    path: '',
    component: MobileComponent,
    data: { shouldDetach: 'no' },
    canActivateChild: [JudgLoginGuard,JudgAuthTaixeGuard],
    children: [

    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRoutingModule { }
