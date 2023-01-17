
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuicklinkStrategy } from 'ngx-quicklink';

const routes: Routes = [
  { path: 'blank', loadChildren: () => import('./layout/blank/blank.module').then(m => m.BlankModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'default', loadChildren: () => import('./layout/default/default.module').then(m => m.DefaultModule) },
  { path: 'mobile', loadChildren: () => import('./pages/mobile/mobile.module').then(m => m.MobileModule)},
  { path: '', redirectTo: '/login/login-form', pathMatch: 'full' },
  { path: '**', redirectTo: '/login/login-form' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: QuicklinkStrategy,
      scrollPositionRestoration: 'top',
      // initialNavigation: 'enabledBlocking',
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
