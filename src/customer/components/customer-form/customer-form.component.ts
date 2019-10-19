import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Customer} from '../../../core/types/customer.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {firestore} from 'firebase';
import * as moment from 'moment';


@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CustomerFormComponent implements OnInit {

  @Output()
  submitted = new EventEmitter<Customer>();

  @Input()
  existingCustomer: Customer;

  public form: FormGroup;


  constructor(private fb: FormBuilder) {
  }

  public ngOnInit(): void {
    this.initForm();
  }


  private initForm(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚ\s]*$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚ\s]*$/)]],
      age: ['', Validators.required, [Validators.min(18), Validators.max(120)]],
      birthdate: ['', Validators.required],
    })
    ;

    if (this.existingCustomer) {
      this.form.patchValue({
        ...this.existingCustomer,
        birthdate: (this.existingCustomer.birthdate as firestore.Timestamp).toDate()
      });
    }
  }

  private calculateAge(birthdate: Date): number {
    return moment().diff(birthdate, 'years');
  }

  public getErrorMsg(controlName: string): string {
    const control = this.form.controls[controlName];
    if (control.hasError('required')) {
      return 'You must enter a value';
    }
    return 'Please Verify this field';
  }

  public isControlValid(controlName: string): boolean {
    return this.form.controls[controlName].valid;
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted.emit(this.form.value);
  }

  public birthdateChanged({value}): void {
    this.form.patchValue({
      age: this.calculateAge(value)
    });
  }


}
