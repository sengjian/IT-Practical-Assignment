import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Customer } from '../customer';
 
@Component({
 selector: 'app-customer-form',
 template: `
   <form class="customer-form" autocomplete="off" [formGroup]="customerForm" (ngSubmit)="submitForm()">
     <div class="form-floating mb-3">
       <input class="form-control" type="text" id="name" formControlName="name" placeholder="Name" required>
       <label for="name">Name</label>
     </div>
 
     <div *ngIf="name.invalid && (name.dirty || name.touched)" class="alert alert-danger">
       <div *ngIf="name.errors?.['required']">
         Name is required.
       </div>
       <div *ngIf="name.errors?.['minlength']">
         Name must be at least 3 characters long.
       </div>
     </div>
 
     <div class="form-floating mb-3">
       <input class="form-control" type="text" formControlName="address" placeholder="Address" required>
       <label for="address">Address</label>
     </div>
 
     <div *ngIf="address.invalid && (address.dirty || address.touched)" class="alert alert-danger">
 
       <div *ngIf="address.errors?.['required']">
         Address is required.
       </div>
       <div *ngIf="address.errors?.['minlength']">
         Address must be at least 5 characters long.
       </div>
     </div>
 
     <button class="btn btn-primary" type="submit" [disabled]="customerForm.invalid">Add</button>
   </form>
 `,
 styles: [
   `.customer-form {
     max-width: 560px;
     margin-left: auto;
     margin-right: auto;
   }`
 ]
})
export class CustomerFormComponent implements OnInit {
 @Input()
 initialState: BehaviorSubject<Customer> = new BehaviorSubject({});
 
 @Output()
 formValuesChanged = new EventEmitter<Customer>();
 
 @Output()
 formSubmitted = new EventEmitter<Customer>();
 
 customerForm: FormGroup = new FormGroup({});
 
 constructor(private fb: FormBuilder) { }
 
 get name() { return this.customerForm.get('name')!; }
 get address() { return this.customerForm.get('address')!; }
 
 ngOnInit() {
   this.initialState.subscribe(customer => {
     this.customerForm = this.fb.group({
       name: [ customer.name, [Validators.required] ],
       address: [ customer.address, [ Validators.required, Validators.minLength(5) ] ],
     });
   });
 
   this.customerForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
 }
 
 submitForm() {
   this.formSubmitted.emit(this.customerForm.value);
 }
}