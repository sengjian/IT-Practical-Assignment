import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
 
@Component({
 selector: 'app-add-customer',
 template: `
   <h2 class="text-center m-5">Add a New Customer</h2>
   <app-customer-form (formSubmitted)="addCustomer($event)"></app-customer-form>
 `
})
export class AddCustomerComponent {
 constructor(
   private router: Router,
   private customerService: CustomerService
 ) { }
 
 addCustomer(customer: Customer) {
   this.customerService.createCustomer(customer)
     .subscribe({
       next: () => {
         this.router.navigate(['/customers']);
       },
       error: (error) => {
         alert("Failed to create customer");
         console.error(error);
       }
     });
 }
}