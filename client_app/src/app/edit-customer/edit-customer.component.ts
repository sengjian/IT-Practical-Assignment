import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
 
@Component({
 selector: 'app-edit-customer.component.ts',
 template: `
   <h2 class="text-center m-5">Edit an Customer</h2>
   <app-customer-form [initialState]="customer" (formSubmitted)="editCustomer($event)"></app-customer-form>
 `
})
export class EditCustomerComponent implements OnInit {
 customer: BehaviorSubject<Customer> = new BehaviorSubject({});
 
 constructor(
   private router: Router,
   private route: ActivatedRoute,
   private customerService: CustomerService,
 ) { }
 
 ngOnInit() {
   const id = this.route.snapshot.paramMap.get('id');
   if (!id) {
     alert('No id provided');
   }
 
   this.customerService.getCustomer(id !).subscribe((customer) => {
     this.customer.next(customer);
   });
 }
 
 editCustomer(customer: Customer) {
   this.customerService.updateCustomer(this.customer.value._id || '', customer)
     .subscribe({
       next: () => {
         this.router.navigate(['/customers']);
       },
       error: (error) => {
         alert('Failed to update customer');
         console.error(error);
       }
     })
 }
}