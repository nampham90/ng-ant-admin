import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '@app/core/services/validators/validators.service';
import { fnCheckForm } from '@app/utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-spch00201subupdate-tiencuocxenha',
  templateUrl: './spch00201subupdate-tiencuocxenha.component.html',
  styleUrls: ['./spch00201subupdate-tiencuocxenha.component.less']
})
export class Spch00201subupdateTiencuocxenhaComponent implements OnInit {
  addEditForm!: FormGroup;
  params: any;
  tiencuocMode = 0;
  constructor(
    private modalRef: NzModalRef, 
    private fb: FormBuilder,
    private cdf : ChangeDetectorRef,
    private validatorsService: ValidatorsService,
  ) { }

  protected getAsyncFnData(modalValue: NzSafeAny): Observable<NzSafeAny> {
    return of(modalValue);
  }

  protected getCurrentValue(): Observable<NzSafeAny> {
    if (!fnCheckForm(this.addEditForm)) {
      return of(false);
    }
    this.addEditForm.value['tiencuoc'] = this.tiencuocMode;
    return of(this.addEditForm.value);
  }

  ngOnInit(): void {
    this.initForm();
    if (Object.keys(this.params).length > 0) {
      this.tiencuocMode = this.params.tiencuoc;
    }
  }

  initForm(): void {
    this.addEditForm = this.fb.group({
      lydo: [null, [Validators.required]],
    });
  }

  changeTiencuoc($event: any) {this.tiencuocMode = $event; }

}
