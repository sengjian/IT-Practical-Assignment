import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Customer } from './customer';
 
@Injectable({
 providedIn: 'root'
})
export class CustomerService {
 private url = 'http://localhost:5200';
 private Customers$: Subject<Customer[]> = new Subject();
 
 constructor(private httpClient: HttpClient) { }
 
 private refreshCustomers() {
   this.httpClient.get<Customer[]>(`${this.url}/Customers`)
     .subscribe(Customers => {
       this.Customers$.next(Customers);
     });
 }
 
 getCustomers(): Subject<Customer[]> {
   this.refreshCustomers();
   return this.Customers$;
 }
 
 getCustomer(id: string): Observable<Customer> {
   return this.httpClient.get<Customer>(`${this.url}/customers/${id}`);
 }
 
 createCustomer(Customer: Customer): Observable<string> {
   return this.httpClient.post(`${this.url}/customers`, Customer, { responseType: 'text' });
 }
 
 updateCustomer(id: string, Customer: Customer): Observable<string> {
   return this.httpClient.put(`${this.url}/customers/${id}`, Customer, { responseType: 'text' });
 }
 
 deleteCustomer(id: string): Observable<string> {
   return this.httpClient.delete(`${this.url}/customers/${id}`, { responseType: 'text' });
 }
}