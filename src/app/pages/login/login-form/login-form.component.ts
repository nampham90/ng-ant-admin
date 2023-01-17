import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { LoginInOutService } from '@core/services/common/login-in-out.service';
import { WindowService } from '@core/services/common/window.service';
import { LoginService } from '@core/services/http/login/login.service';
import { MenuStoreService } from '@store/common-store/menu-store.service';
import { SpinService } from '@store/common-store/spin.service';
import { UserInfoService } from '@store/common-store/userInfo.service';
import { fnCheckForm } from '@utils/tools';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit {
  validateForm!: FormGroup;

  loginaccount = true;
  logintaixe = false;

  constructor(
    private fb: FormBuilder,
    private loginInOutService: LoginInOutService,
    private menuService: MenuStoreService,
    private dataService: LoginService,
    private spinService: SpinService,
    private windowServe: WindowService,
    private userInfoService: UserInfoService,
    private router: Router
  ) {}

  submitForm(): void {
    // check form 
    if (!fnCheckForm(this.validateForm)) {
      return;
    }
    // show loading true
    this.spinService.setCurrentGlobalSpinStore(true);
    // get giá trị trong form
    let param = this.validateForm.getRawValue();
    if(this.logintaixe == true) {
      param["mode"] = 'mobile';
    }

    console.log(param);
    
    this.dataService
      .login(param)
      .pipe(
        // show loading false
        finalize(() => {
          this.spinService.setCurrentGlobalSpinStore(false);
        })
      )
      .subscribe(userToken => {
        // Sau khi đăng nhập nền thành công tại đây, chỉ một bộ mã thông báo được mã hóa bởi jwt sẽ được trả lại và mã thông báo cần được phân tích cú pháp bên dưới
        this.loginInOutService
          .loginIn(userToken)
          .then(() => {
            if(param['mode'] && param['mode'] == 'mobile') {
              this.router.navigateByUrl('mobile')
            } else {
              this.router.navigateByUrl('default/dashboard/analysis');
            }
            
          })
          .finally(() => {
            this.spinService.setCurrentGlobalSpinStore(false);
          });
      });
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      sodienthoai: [null, [Validators.required]],
      passwordtaixe: [null, [Validators.required]]
    });
  }

  changeTabs($event: any) {
    if ($event == 1) {
      this.logintaixe = true;
      this.loginaccount = false;
    } else {
      this.logintaixe = false;
      this.loginaccount = true;
    }
  }
}
