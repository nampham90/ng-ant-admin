
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '@core/core.module';
import { InitThemeService } from '@core/services/common/init-theme.service';
import {LoadAliIconCdnService} from "@core/services/common/load-ali-icon-cdn.service";
import {SubLockedStatusService} from "@core/services/common/sub-locked-status.service";
import { SubWindowWithService } from '@core/services/common/sub-window-with.service';
import { ThemeSkinService } from '@core/services/common/theme-skin.service';
import { StartupService } from '@core/startup/startup.service';
import { SharedModule } from '@shared/shared.module';
import { LoginModalModule } from '@widget/biz-widget/login/login-modal.module';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { QuicklinkModule } from 'ngx-quicklink';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import interceptors from './core/services/interceptors';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { DatePipe } from '@angular/common';


export function StartupServiceFactory(startupService: StartupService) {
  return () => startupService.load();
}

export function LoadAliIconCdnFactory(loadAliIconCdnService: LoadAliIconCdnService) {
  return () => loadAliIconCdnService.load();
}

export function InitThemeServiceFactory(initThemeService: InitThemeService) {
  return async () => await initThemeService.initTheme();
}

export function InitLockedStatusServiceFactory(subLockedStatusService: SubLockedStatusService) {
  return () => subLockedStatusService.initLockedStatus();
}

export function SubWindowWithServiceFactory(subWindowWithService: SubWindowWithService) {
  return () => subWindowWithService.subWindowWidth();
}

// Khởi tạo dịch vụ
const APPINIT_PROVIDES = [
  //  Khởi động dự án
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true
  },
  // Tải dữ liệu biểu tượng của Alibaba từ CDN
  {
    provide: APP_INITIALIZER,
    useFactory: LoadAliIconCdnFactory,
    deps: [LoadAliIconCdnService],
    multi: true
  },
  // Khởi tạo dịch vụ khóa màn hình
  {
    provide: APP_INITIALIZER,
    useFactory: InitLockedStatusServiceFactory,
    deps: [SubLockedStatusService],
    multi: true
  },
  //Khởi tạo chủ đề
  {
    provide: APP_INITIALIZER,
    useFactory: InitThemeServiceFactory,
    deps: [InitThemeService],
    multi: true
  },
  // Khởi tạo dịch vụ theo dõi độ rộng màn hình
  {
    provide: APP_INITIALIZER,
    useFactory: SubWindowWithServiceFactory,
    deps: [SubWindowWithService],
    multi: true
  },
  //  Khởi tạo CSS cho chế độ tối hoặc chế độ mặc định"
  {
    provide: APP_INITIALIZER,
    useFactory: (themeService: ThemeSkinService) => () => {
      return themeService.loadTheme();
    },
    deps: [ThemeSkinService],
    multi: true
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, CoreModule, SharedModule, LoginModalModule, PasswordStrengthMeterModule.forRoot(), QuicklinkModule, AppRoutingModule, StoreModule.forRoot({}, {}), StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }), EffectsModule.forRoot([])],
  providers: [...interceptors, ...APPINIT_PROVIDES,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
