import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
 
@Component({
 selector: 'app-customers-list',
 template: `
   <h2 class="text-center m-5">Customers List</h2>
 
   <table class="table table-striped table-bordered">
       <thead>
           <tr>
               <th>Name</th>
               <th>Address</th>
               <th>Action</th>
           </tr>
       </thead>
 
       <tbody>
           <tr *ngFor="let customer of customers$ | async">
               <td>{{customer.name}}</td>
               <td>{{customer.address}}</td>
               <td>
                   <button class="btn btn-primary me-1" [routerLink]="['edit/', customer._id]">Edit</button>
                   <button class="btn btn-danger" (click)="deleteCustomer(customer._id || '')">Delete</button>
               </td>
           </tr>
       </tbody>
   </table>
 
   <button class="btn btn-primary mt-3" [routerLink]="['new']">Add a New Customer</button>
 `
})
export class CustomersListComponent implements OnInit {
 customers$: Observable<Customer[]> = new Observable();
 
 constructor(private customersService: CustomerService) { }
 
 ngOnInit(): void {
   this.fetchCustomers();
 }
 
 deleteCustomer(id: string): void {
   this.customersService.deleteCustomer(id).subscribe({
     next: () => this.fetchCustomers()
   });
 }
 
 private fetchCustomers(): void {
   this.customers$ = this.customersService.getCustomers();
 }
}