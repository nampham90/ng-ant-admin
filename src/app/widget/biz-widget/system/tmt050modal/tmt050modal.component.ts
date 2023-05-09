import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { ValidatorsService } from '@app/core/services/validators/validators.service';
import { fnCheckForm } from '@app/utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-tmt050modal',
  templateUrl: './tmt050modal.component.html',
  styleUrls: ['./tmt050modal.component.less']
})
export class Tmt050modalComponent implements OnInit {

  addEditForm!: FormGroup;
  params!: any;
  tilte : any = {
    datacd : "",
    datanm : "",
    datarnm : ""
  }
 
  constructor(
    private modalRef: NzModalRef,
    private fb: FormBuilder,
    private cdf : ChangeDetectorRef,
    private validatorsService: ValidatorsService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    if (Object.keys(this.params).length > 0) {
      //this.addEditForm.patchValue(this.params);
      for(let key in this.params) {
         if(this.params.hasOwnProperty(key)) {
            this.tilte[key] = this.params[key];
         }
      }

      if(this.params.data) {
        this.addEditForm.patchValue(this.params.data);
      }

    }
  }

  protected getAsyncFnData(modalValue: NzSafeAny): Observable<NzSafeAny> {
    return of(modalValue);
  }

  protected getCurrentValue(): Observable<NzSafeAny> {
    if (!fnCheckForm(this.addEditForm)) {
      return of(false);
    }
    return of(this.addEditForm.value);
  }

  get f():{ [key: string]: AbstractControl } {
    return this.addEditForm.controls;
  }

  initForm(): void {
    this.addEditForm = this.fb.group({
      datacd: [null, [Validators.required]],
      datanm: [null, [Validators.required]],
      datarnm: [null,[Validators.required]]
    });
  }

}
