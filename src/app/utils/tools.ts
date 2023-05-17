/* eslint-disable prettier/prettier */
import { FormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SimpleReuseStrategy } from '@app/core/services/common/reuse-strategy';
import { LockScreenFlag } from '@store/common-store/lock-screen-store.service';
import CryptoJS from 'crypto-js';
import { endOfDay, startOfDay } from 'date-fns';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { silentEvent } from 'ng-zorro-antd/core/util';
import { v4 as uuidv4 } from 'uuid';

const  fnReload = async function reload(router: Router, url: string) {
  const sourceUrl = url;
  // Chỉ tab hiện tại được làm mới, nếu liên quan đến trang chi tiết trong tab sẽ không được làm mới
  const currentRoute = fnGetPathWithoutParam(sourceUrl);
  const queryParams = router.parseUrl(sourceUrl).queryParams;
  router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    SimpleReuseStrategy.deleteRouteSnapshot(fngetPathKey(router,sourceUrl));
    router.navigate([currentRoute], { queryParams });
  });
}

const fngetPathKey = function getPathKey(router: Router,path: string): string {
  const tempPath = fnFormatePath(path);
  const pathParam = router.parseUrl(path).queryParams;
  let pathParamString = '';
  if (Object.keys(pathParam).length > 0) {
    pathParamString = JSON.stringify(router.parseUrl(path).queryParams);
  }
  return tempPath + pathParamString;
}

/* Lấy một số nguyên ngẫu nhiên từ 1 đến 100 this.randomNum(1,101) */
const fnGetRandomNum = function getRandomNum(m: number, n: number): number {
  let num = Math.floor(Math.random() * (m - n) + n);
  return num;
};

const fnGetFile = function getFile(url: string, isBlob = false): Promise<NzSafeAny> {
  return new Promise((resolve, reject) => {
    const client = new XMLHttpRequest();
    client.responseType = isBlob ? 'blob' : '';
    client.onreadystatechange = () => {
      if (client.readyState !== 4) {
        return;
      }
      if (client.status === 200) {
        const urlArr = client.responseURL.split('/');
        resolve({
          data: client.response,
          url: urlArr[urlArr.length - 1]
        });
      } else {
        reject(new Error(client.statusText));
      }
    };
    client.open('GET', url);
    client.send();
  });
};

const fnCheckForm = function checkForm(form: FormGroup): boolean {
  Object.keys(form.controls).forEach(key => {
    form.controls[key].markAsDirty();
    form.controls[key].updateValueAndValidity();
  });
  return !form.invalid;
};

// Xóa bỏ formArray
const fnClearFormArray = function clearFormArray(formArray: FormArray): void {
  while (formArray.length !== 0) {
    formArray.removeAt(0);
  }
};

const fnStopMouseEvent = function stopMouseEvent(e: MouseEvent): void {
  silentEvent(e);
  // e.stopPropagation();
  // e.preventDefault();
};

// Loại bỏ các đối tượng trùng nhau trong mảng
const fnRemoveDouble = function removeDouble<T>(list: NzSafeAny[], col: NzSafeAny): T {
  const obj = {};
  return list.reduce((cur, next) => {
    // @ts-ignore
    obj[next[col]] ? '' : (obj[next[col]] = true && cur.push(next));
    return cur;
  }, []);
};

// Lấy chuỗi sau dấu / cuối cùng của định tuyến
const fnFormatePath = function formatePath(path: string): string {
  const newpath = path.replace(/\/[0-9]+/g, '');
  const paramIndex = newpath.substring(newpath.lastIndexOf('/') + 1).indexOf('?');
  if (paramIndex > -1) {
    const tempPath = newpath.substring(newpath.lastIndexOf('/') + 1);
    return tempPath.substring(0, paramIndex);
  } else {
    return newpath.substring(newpath.lastIndexOf('/') + 1);
  }
};

// Lấy định tuyến không có tham số
const fnGetPathWithoutParam = function getPathWithoutParam(path: string): string {
  const paramIndex = path.indexOf('?');
  if (paramIndex > -1) {
    return path.substring(0, paramIndex);
  }
  return path;
};

// Trả về uuid
const fnGetUUID = function getUUID(): string {
  return uuidv4();
};

const fnGetBase64 = function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

// Mã hóa
const fnEncrypt = function encrypt(word: NzSafeAny, keyStr: string): string {
  return CryptoJS.AES.encrypt(JSON.stringify(word), keyStr).toString();
};

// Giải mã
const fnDecrypt = function decrypt(word: NzSafeAny, keyStr: string): LockScreenFlag {
  const bytes = CryptoJS.AES.decrypt(word, keyStr);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

/*import {endOfDay, startOfDay} from 'date-fns';*/
const fnStartOfDay = function StartOfDay(time: number): number {
  return startOfDay(time).getTime();
};

const fnEndOfDay = function EndOfDay(time: number): number {
  return endOfDay(time).getTime();
};

export {
  fnDecrypt,
  fnEncrypt,
  fnGetBase64,
  fnGetPathWithoutParam,
  fnGetFile,
  fnClearFormArray,
  fnCheckForm,
  fnStopMouseEvent,
  fnFormatePath,
  fnRemoveDouble,
  fnGetRandomNum,
  fnStartOfDay,
  fnEndOfDay,
  fnGetUUID,
  fnReload
};
