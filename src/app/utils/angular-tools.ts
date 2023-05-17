/* eslint-disable prettier/prettier */
import { ChangeDetectorRef, inject, ViewRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OperatorFunction, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/*https://github.com/angular/angular/issues/46119*/
/*  Chỉ có thể sử dụng trong phiên bản V14 trở lên, phiên bản thấp hơn phải sử dụng dịch vụ được cung cấp bởi src/app/core/services/common/destory.service.ts
 *   destroy$=untilDestroyedFn();
 *
 *    someObserve.pipe(this.destroy$).subscribe()
 * */
const untilDestroyedFn = function untilDestroyed(): OperatorFunction<any, any> {
  const subject = new Subject<void>();
  const viewRef = inject(ChangeDetectorRef) as ViewRef;

  viewRef.onDestroy(() => {
    subject.next();
    subject.complete();
  });

  return takeUntil(subject.asObservable());
};

// Lấy tham số của định tuyến
const getRouteParamFn = function getRouteParam(key: string): string {
  return inject(ActivatedRoute).snapshot.params[key];
};

export { untilDestroyedFn, getRouteParamFn };
