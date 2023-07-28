import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fnCheckForm } from '@app/utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-spkh00201subthanhtoan',
  templateUrl: './spkh00201subthanhtoan.component.html',
  styleUrls: ['./spkh00201subthanhtoan.component.less']
})
export class Spkh00201subthanhtoanComponent implements OnInit {
  checkoutForm!: FormGroup;
  constructor( 
    private modalRef: NzModalRef, 
    private fb: FormBuilder,
    ) { }

  protected getAsyncFnData(modalValue: NzSafeAny): Observable<NzSafeAny> {
    return of(modalValue);
  }

  protected getCurrentValue(): Observable<NzSafeAny> {
    if (!fnCheckForm(this.checkoutForm)) {
      return of(false);
    }
    return of(this.checkoutForm.value);
  }

  ngOnInit(): void {
    this.initForm();
  }

  changeType($event: Event) {

  }

  initForm(): void {
    this.checkoutForm = this.fb.group({
      sohdttcnkh: [null, [Validators.required]],
      type: ['A',[Validators.required]],
    });
  }

}
