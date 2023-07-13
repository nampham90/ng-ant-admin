
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PageInfo, SearchCommonVO } from '../../types';
import { BaseHttpService } from '../base-http.service';
import * as Const from "src/app/common/const"

/*
 * 用户管理
 * */

export interface User {
  id: number;
  password: string;
  userName?: string;
  available?: boolean;
  roleName?: string[];
  sex?: 1 | 0;
  telephone?: string;
  mobile?: string | number;
  email?: string;
  lastLoginTime?: Date;
  oldPassword?: string;
  departmentId?: number;
  departmentName?: string;
}

export interface SmartUser {
  phongban_id: string;
  makhachhang: string;
  name: string;
  dienthoai: string;
  email: String;
  password: String;
}

/*
 * 用户修改密码
 * */
export interface UserPsd {
  id: number;
  oldPassword: string;
  newPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(public http: BaseHttpService) {}

  public getAccount(param: SearchCommonVO<User>): Observable<any> {
    return this.http.post(Const.Ant100findAllUser, param);
  }

  public getAccountDetail(id: number): Observable<User> {
    return this.http.get(`${Const.Ant100GetDetailUser}/${id}/`);
  }

  public addAccount(param: User): Observable<void> {
    return this.http.post(Const.Ant100AddDetailUser, param);
  }

  public addSmartAccount(param: SmartUser): Observable<void> {
    return this.http.post(Const.Ant100AddSmartDetailUser, param);
  }

  public delAccount(ids: number[]): Observable<void> {
    return this.http.post('/user/del/', { ids });
  }

  public editAccount(param: User): Observable<void> {
    return this.http.put(Const.Ant100EditDetailUser, param);
  }

  public editAccountPsd(param: UserPsd): Observable<any> {
    return this.http.put(Const.Ant100ChangePasswordUser, param);
  }
}
